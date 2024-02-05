const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authentication = async(req, res) => {
    try {
        const usernameAttempt = req.body.username;
        const passwordAttempt = req.body.password;
        const userData = await User.findOne({'username':usernameAttempt});
        if(!userData) {
            return res.status(400).send('User does not exist');
        }

        bcrypt.compare(passwordAttempt, userData.passwordHash, function(err, result) {
            if(err) {
                res.status(400).send(err);
            } else {
                if(result) {
                    const token = jwt.sign({'userID':userData._id}, process.env.JWT_SECRET, {expiresIn :'1hr'});
                    res.cookie('token', token, { httpOnly: true, maxAge: 3600000, SameSite: 'Lax' }); // For local development
                    res.status(200).json({ userID: userData._id });
                } else {
                    res.status(400).send('Incorrect username/password');
                }
            }
        });
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });    
    }
}

module.exports = { authentication };