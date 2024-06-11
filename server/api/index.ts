const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

function apiKeyCheck(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

app.use(apiKeyCheck);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, "../tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

mongoose.connect(`${process.env.MONGODB_URI}/palhiveDB`, {
  family: 4,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  pfpUri: String,
  bio: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followerCount: Number,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followingCount: Number,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  postsCount: Number,
});

const postSchema = new mongoose.Schema({
  title: String,
  postText: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likeCount: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

app.get("/ping", (req, res) => {
  // Simulate some delay to mimic server response time
  setTimeout(() => {
    res.status(200).send("OK");
  }, 500);
});

app.post("/upload-cloudinary", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "PalHive",
      resource_type: "image",
    });

    if (result && result.public_id) {
      fs.unlinkSync(req.file.path);

      res.status(200).json({ url: result.secure_url });
    } else {
      res.status(500).json({ error: "Upload failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Delete image from Cloudinary
app.delete("/delete-cloudinary/:publicId", async (req, res) => {
  try {
    cloudinary.v2.api
      .delete_resources([`PalHive/${req.params.publicId}`], {
        type: "upload",
        resource_type: "image",
      })
      .then(res.status(200).json({ message: "Image deleted successfully" }));
  } catch (error) {
    res.status(500).json({ error: "Deletion failed" });
  }
});

// Check if an email exists
app.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ user: user, exists: true });
    } else {
      res.status(200).json({ user: user, exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch a user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a user
app.put("/users/:username", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const post = new Post({
      ...req.body,
      user: user._id,
    });

    await post.save();

    user.posts.push(post._id);
    user.postsCount += 1;
    await user.save();

    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Fetch all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username pfpUri");
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch all posts by a specific user
app.get("/users/:username/posts", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send();
    }
    const userPosts = await Post.find({ user: user._id }).populate(
      "user",
      "username pfpUri"
    ); // Populate the 'user' field with 'username' and 'pfpUri'
    res.send(userPosts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update post likes
app.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
