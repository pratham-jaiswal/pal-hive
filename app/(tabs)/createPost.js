import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { AccountContext } from "../_layout";
import axios from "axios";
import serverConfig from "../../server_config";
import * as ImagePicker from "expo-image-picker";

function CreatePost() {
  const { accountData, setAccountData } = useContext(AccountContext);

  const [text, setText] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [modal, setModal] = useState({
    text: "",
    show: false,
  });
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setText("");
        setSelection({ start: 0, end: 0 });
        setModal({ text: "", show: false });
        setImageData([]);
        setLoading(false);
      };
    }, [])
  );

  const addMarkdown = (prefix, suffix = "", newLine = false) => {
    const selectedText = text.substring(selection.start, selection.end);
    if (newLine) {
      const newText =
        text.substring(0, selection.start).trim() +
        prefix +
        selectedText.trim() +
        suffix +
        text.substring(selection.end).trim();
      setText(newText.trim());
    } else {
      const newText =
        text.substring(0, selection.start) +
        prefix +
        selectedText +
        suffix +
        text.substring(selection.end);
      setText(newText.trim());
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setLoading(true);
      const type = result.assets[0].mimeType;
      const base64 = result.assets[0].base64;
      const dataUri = `data:${type};base64,${base64}`;

      try {
        const response = await axios.post(
          `${serverConfig.api_uri}/upload-cloudinary`,
          {
            dataUri
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": serverConfig.api_key,
            },
          }
        );
        const imageUrl = response.data.url;
        const placeholder = `![image-${Date.now()}](${
          result.assets[0].fileName || "image"
        })`;
        setText((prevText) => prevText + "\n" + placeholder + "\n");
        setImageData((prevData) => ({
          ...prevData,
          [placeholder]: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const replacePlaceholdersWithUris = (text, imageData) => {
    let result = text.trim();
    for (const placeholder in imageData) {
      const url = imageData[placeholder];
      const markdownImage = `${placeholder.slice(
        0,
        placeholder.indexOf("(") + 1
      )}${url})`;
      result = result.replace(placeholder, markdownImage);
    }
    return result;
  };

  const uploadPost = async () => {
    try {
      const newPost = {
        title: `Post ${accountData.posts.length + 1}`,
        postText: text,
        username: accountData.username,
        likedBy: [],
        likeCount: 0,
      };

      const response = await axios.post(
        `${serverConfig.api_uri}/posts`,
        newPost,
        {
          headers: {
            "x-api-key": serverConfig.api_key,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedAccountData = {
        ...accountData,
        posts: [...accountData.posts, response.data],
        postsCount: accountData.postsCount + 1,
      };

      setAccountData(updatedAccountData);
      setModal({
        text: "Your post has been uploaded!",
        show: true,
      });
    } catch (error) {
      console.error(error);
      setModal({
        text: "An error occurred. Please try again later.",
        show: true,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.inputBox}
        multiline={true}
        numberOfLines={6}
        value={text}
        onChangeText={setText}
        onSelectionChange={({ nativeEvent: { selection } }) =>
          setSelection(selection)
        }
        placeholder="Write your post here..."
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addMarkdown("\n# ", "\n", true)}
          >
            <Text>H1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addMarkdown("\n## ", "\n", true)}
          >
            <Text>H2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addMarkdown("\n### ", "\n", true)}
          >
            <Text>H3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addMarkdown("**", "**")}
          >
            <Text>Bold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addMarkdown("*", "*")}
          >
            <Text>Italic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addMarkdown("[", "](valid_url)")}
          >
            <Text>Hyperlink</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, { flexGrow: 1 }]}
            onPress={pickImage}
          >
            <Text>Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.preview}>
        <Markdown>{replacePlaceholdersWithUris(text, imageData)}</Markdown>
      </View>
      <View
        style={[
          styles.buttonsRow,
          { justifyContent: "center", marginTop: 50, marginBottom: 150 },
        ]}
      >
        <TouchableOpacity
          style={[styles.button]}
          onPress={uploadPost}
          disabled={!text}
          activeOpacity={0.5}
        >
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal.show}
        onRequestClose={() => {
          setModal({
            text: "",
            show: false,
          });
        }}
      >
        <View
          style={{
            backgroundColor: "#00000080",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff9d0e6",
              width: "60%",
              borderRadius: 12,
              paddingVertical: 20,
              paddingHorizontal: 15,
              justifyContent: "space-between",
              gap: 30,
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center" }}>
              Your post has been uploaded!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#5AB2FF",
                borderRadius: 12,
                paddingVertical: 7,
                paddingHorizontal: 10,
                alignSelf: "flex-end",
              }}
              activeOpacity={0.5}
              onPress={() => {
                setText("");
                setModal({
                  text: "",
                  show: false,
                });
              }}
            >
              <Text style={{ textAlign: "center", color: "#FFF9D0" }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={loading}
        onRequestClose={() => {}}
      >
        <View
          style={{
            backgroundColor: "#00000080",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#FFF9D0" />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    marginHorizontal: 15,
    paddingHorizontal: 7,
  },
  inputBox: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#FFF9D0",
    textAlignVertical: "top",
  },
  buttonsContainer: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  button: {
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
    backgroundColor: "#FFF9D0",
    padding: 10,
  },
  preview: {
    width: "100%",
    minHeight: 50,
    backgroundColor: "#CAF4FF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default CreatePost;
