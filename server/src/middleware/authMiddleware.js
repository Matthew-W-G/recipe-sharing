const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const Recipe = require('../models/Recipe.js')

//just veryifying token is authentic
const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: 'Authentication token is missing.' });
    }
    const jwtToken = authHeader.split(' ')[1];

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
        if(err) {
            return res.status(403).json({message:'Token is not valid'});
        } else {
            req.user = data;
            next();
        }
    })
}

//authenticateUserAction and authenticateRecipeAction verifies accuracy of id param
const authenticateUserAction = (req, res, next) => {
    if(!req.user || !req.user.userID || req.user.userID !== req.params.userID) {
        return res.status(403).json({message:'Unauthorized access'});
    }
    else {
        next();
    }
}

const authenticateRecipeAction = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.userID);
        if(!user) {
            return res.status(403).json({message:'Unauthorized access'});
        }

        const recipe = await Recipe.findById(req.params.recipeID);

        if(!recipe.author.equals(user._id)) {
            return res.status(403).json({message:'Unauthorized access'});
        }
        else {
            next();
        }
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}



module.exports = { verifyToken, authenticateUserAction, authenticateRecipeAction};