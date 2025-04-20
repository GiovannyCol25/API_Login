// Conecta el módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

//Esquema para los documentos de la colección "Post"
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Exportamos el modelo "Post" basado en el esquema definido
module.exports = mongoose.model('Post', PostSchema);
