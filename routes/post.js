// Conexión al módulo express para manejar las rutas
const express = require('express');
// enrutador para definir las rutas relacionadas con los posts
const router = express.Router();
// Importe del modelo "Post" para interactuar con la base de datos
const Post = require('../models/Post');

// Ruta para crear un nuevo post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title, // Título del post
        content: req.body.content // Contenido del post
    });
    try {
        const savedPost = await post.save(); // Guardar el post en la base de datos
        res.json(savedPost); // Devolver el post guardado como respuesta
    } catch (err) {
        res.status(500).json({ message: err.message }); // Mensaje de errores
    }
});

// Ruta para obtener los posts
router.get('/:postsId', async (req, res) => {
    try {
        // Obtener todos los posts de la base de datos
        const post = await Post.findById(req.params.postsId);
        res.json(post);
    } catch (err) {
        // Manejo de errores
        res.status(500).json({ message: err.message });
    }
});

// Ruta para eliminar un post específico por su ID
router.delete('/:postsId', async (req, res) => {
    try {
        // Eliminar el post de la base de datos
        const removedPost = await Post.deleteOne({ _id: req.params.postsId });
        // Si no se encuentra el post, devolver un mensaje de error
        res.json(removedPost);
    } catch (err) {
        // Manejo de errores
        res.status(500).json({ message: err.message });
    }
});

// Ruta para actualizar un post específico por su ID
router.patch('/:postsId', async (req, res) => {
    try {
        // Actualizar el post en la base de datos
        const updatedPost = await Post.updateOne(
            { _id: req.params.postsId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        // Manejo de errores
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
