const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: String,
    prepTime: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
