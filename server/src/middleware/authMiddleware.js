const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const Recipe = require('../models/Recipe.js')

//just veryifying token is authentic
const verifyToken = async(req, res, next) => {
    const jwtToken = req.cookies.token;

    if(!jwtToken) {
        return res.status(401).json({message:'Unauthorized'});
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
        if(err) {
            return res.status(403).json({message:'Token is not valid'});
        } else {
            req.user = data;
            next();
        }
    })
}

//authenticateAdminAction, authenticateUserAction and authenticateRecipeAction verify accuracy of id param
const authenticateAdminAction = async(req, res, next) => {
    if(!req.user || !req.user.userID) {
        return res.status(400).json({message:'Error with user'});
    }
    try {
        const user = await User.findById(req.user.userID);
        const role = user.role
        if(role !== 'admin') {
            return res.status(403).json({message:'Permission issue'});
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

const authenticateUserAction = async(req, res, next) => {
    if(!req.user || !req.user.userID) {
        return res.status(400).json({message:'Error with user'});
    }

    try {
        const user = await User.findById(req.user.userID);
        const role = user.role;
        if(role === 'admin' || role == 'user' && req.user.userID === req.params.userID) {
            next();
        }
        else {
            return res.status(403).json({message:'Unauthorized access'});
        }
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const authenticateRecipeAction = async(req, res, next) => {
    if(!req.user || !req.user.userID) {
        return res.status(400).json({message:'Error with user'});
    }

    try {
        const user = await User.findById(req.user.userID);
        if(!user) {
            return res.status(403).json({message:'Unauthorized access'});
        }
        const role = user.role;

        if(!req.params.recipeID) {
            next();
            return;
        }

        const recipe = await Recipe.findById(req.params.recipeID);
        if(role === 'admin' || role == 'user' && recipe.authorID.equals(user._id)) {
            next();
        }
        else {
            return res.status(403).json({message:'Unauthorized access'});
        }
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}



module.exports = { verifyToken, authenticateAdminAction, authenticateUserAction, authenticateRecipeAction};