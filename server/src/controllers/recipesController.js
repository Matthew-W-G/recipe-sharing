const Recipe = require('../models/Recipe.js')
const User = require('../models/User.js')

const viewRecipe = async(req, res) => {
    try {
        const recipeID = req.params.recipeID;
        const recipe = await Recipe.findById(recipeID);
        if(!recipe) {
            return res.status(400).json({message:'Recipe not found!'});
        }
        res.status(200).json({recipe});
    } catch(err) {
        if(err.name === 'ValidationError') { 
            return res.status(400).json({ message: err.message });
        } 
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const addRecipe = async (req, res) => {
    try {
        let newRecipe = new Recipe(req.body);
        newRecipe.authorID = req.user.userID;
        const user = await User.findById(req.user.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        newRecipe.author = user.username;

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const id = req.params.recipeID;
        const data = await Recipe.findById(id);
        if (!data) {
            return res.status(404).send(`Recipe with ${id} does not exist`);
        }

        const unpermitted = ['authorID'];
        const isPermitted = Object.keys(req.body).every((field) => !unpermitted.includes(field));
        if (!isPermitted) {
            return res.status(400).send({ message: 'Invalid updates!' });
        }

        await Recipe.updateOne({ _id: id }, req.body)
        const newData = await Recipe.findById(id);
        res.status(200).json(newData);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const listRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes)
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.recipeID;
        const data = await Recipe.findById(id);
        if (!data) {
            return res.status(404).send(`Recipe with ${id} does not exist`);
        }
        await Recipe.findByIdAndDelete(id);
        res.status(200).send(`Recipe with ${id} deleted`);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const featuredRecipes = async (req, res) => {
    try {
        const featured = await Recipe.aggregate([{ $sample: { size: 3 } }]);
        if(!featured) {
            return res.status(400).send('Not enough data');
        }
        res.status(200).json(featured)
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addRecipe, listRecipes, deleteRecipe, updateRecipe, featuredRecipes, viewRecipe }