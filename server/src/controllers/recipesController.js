const Recipe = require('../models/Recipe.js')

const addRecipe = async(req, res) => {
    try {
        let newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch(err) { 
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateRecipe = async(req, res) => { 
    try {
        const id = req.params.recipeID;
        const data = await Recipe.findById(id);
        if(!data) {
            return res.status(404).send(`Recipe with ${id} does not exist`);
        }
        await Recipe.updateOne({_id:id}, req.body)
        const newData = await Recipe.findById(id);
        res.status(200).json(newData);
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const listRecipes = async(req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes)
    } catch(err) { 
        if(err.name==='ValidationError') {
            res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });    
    }
}

const deleteRecipe = async(req, res) => {
    try {
        const id = req.params.recipeID;
        const data = await Recipe.findById(id);
        if(!data) { 
            return res.status(404).send(`Recipe with ${id} does not exist`);
        }
        await Recipe.findByIdAndDelete(id);
        res.status(200).send(`Recipe with ${id} deleted`);
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });    
    }
}

module.exports = {addRecipe, listRecipes, deleteRecipe, updateRecipe}