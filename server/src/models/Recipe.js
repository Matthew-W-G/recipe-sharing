const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    prepTime: {
        type: String,
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: String,
    }});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
