import express from "express";
import mongoose from "mongoose";
import Post from "../models/postModel.js";

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 8;
    const startIndex = (Number(page) - 1) * limit;

    const totalPosts = await Post.countDocuments({});
    const requiredPosts = await Post.find()
      .sort({ _id: "desc" })
      .limit(limit)
      .skip(startIndex);

    const result = {
      data: requiredPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const searchTitle = new RegExp(searchQuery, "i");
  const searchTags = tags ? tags.split(",") : ["none"];

  try {
    const searchPosts = await Post.find({
      $or: [{ title: searchTitle }, { tags: { $in: searchTags } }],
    });

    res.status(200).json(searchPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const postUpdate = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found with the provided ID.");

  const updatedPost = await Post.findByIdAndUpdate(_id, postUpdate, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found with the provided ID.");

  await Post.findByIdAndDelete(_id);

  res.status(200).json({ message: "Post deleted Successfully." });
};

const likePost = async (req, res) => {
  const { id: _id } = req.params;

  const userId = req.userId;

  if (!userId)
    return res.status(404).send("Authentication required for this action.");

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found with the provided ID.");

  const post = await Post.findById(_id);

  const isAlreadyLiked = post.likes.find((likeId) => likeId === String(userId));

  if (!isAlreadyLiked) {
    post.likes.push(userId);
  } else {
    post.likes = post.likes.filter((likeId) => likeId !== isAlreadyLiked);
  }

  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const post = await Post.findById(id);

  post.comments.push(comment);

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.status(200).json(updatedPost);
};

export {
  getPost,
  getPostBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
};
