const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:postsId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postsId);
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:postsId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postsId });
        res.json(removedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:postsId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postsId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
