/** @format */

const express = require("express");
const { Post, User } = require("../models");
const { verifyToken } = require("../middleware/verify");

const router = express.Router();

// Create a new post
router.post("/", verifyToken, async (req, res) => {
	const { title, content, tag, bannerImageLink, description } = req.body;

	try {
		const newPost = await Post.create({
			title,
			content,
			tag,
			description,
			bannerImageLink,
			authorId: req.userId,
		});
		res.json(newPost);
	} catch (err) {
		res.status(500).json({
			message: "Error creating post",
			error: err.message,
		});
	}
});

// Get all posts, optionally filtered by author
router.get("/", async (req, res) => {
	const { author } = req.query;
	try {
		const authorFilter = author ? { authorId: author } : {};
		const posts = await Post.findAll({
			where: authorFilter,
			include: { model: User, attributes: ["email", "username"] },
		});
		res.json(posts);
	} catch (err) {
		res.status(500).json({
			message: "Error fetching posts",
			error: err.message,
		});
	}
});

// Get posts by tag
router.get("/tag/:tag", async (req, res) => {
	const { tag } = req.params;

	try {
		const posts = await Post.findAll({
			where: { tag },
			include: { model: User, attributes: ["email"] },
		});

		// Check if no posts were found with the given tag
		if (posts.length === 0) {
			return res
				.status(404)
				.json({ message: "No posts found with this tag" });
		}

		res.json(posts);
	} catch (err) {
		res.status(500).json({
			message: "Error fetching posts by tag",
			error: err.message,
		});
	}
});

// Get a post by ID
router.get("/:postId", async (req, res) => {
	const { postId } = req.params;

	try {
		const post = await Post.findOne({
			where: { id: postId },
			include: { model: User, attributes: ["email", "username"]}
		});
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({
			message: "Error updating post",
			error: err.message,
		});
	}
});

// Update a post by ID
router.put("/:postId", verifyToken, async (req, res) => {
	const { postId } = req.params;
	const { title, content, tag } = req.body;

	try {
		const post = await Post.findOne({
			where: { id: postId, authorId: req.userId },
		});

		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found or you are not the author" });
		}

		post.title = title || post.title;
		post.content = content || post.content;
		post.tag = tag || post.tag;
		await post.save();

		res.status(200).json({ message: "Post updated successfully", post });
	} catch (err) {
		res.status(500).json({
			message: "Error updating post",
			error: err.message,
		});
	}
});

// Delete a post by ID
router.delete("/:postId", verifyToken, async (req, res) => {
	const { postId } = req.params;

	try {
		const post = await Post.findOne({
			where: { id: postId, authorId: req.userId },
		});

		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found or you are not the author" });
		}

		await post.destroy();
		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({
			message: "Error deleting post",
			error: err.message,
		});
	}
});

module.exports = router;
