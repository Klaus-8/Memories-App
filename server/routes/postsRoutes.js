import express from "express";
import {
  getPosts,
  getPostBySearch,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/postsControllers.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
