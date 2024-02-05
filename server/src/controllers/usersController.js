const User = require('../models/User.js')
const mongoose = require('mongoose');

const addUser = async(req, res) => {
    try {
        const usernameTaken = await User.find({username: req.body.username});
        if(usernameTaken.length >= 1 ) {
            return res.status(409).send({message: "Username taken"});
        }
        const data = { ...req.body, passwordHash: req.body.password};
        delete data.password;
        const newUser = new User(data);
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });       
    }
};

const getUser = async(req, res) => {
    try {
        const id = req.params.userID;
        const data = await User.findById(id);
        const { role, passwordHash, __v, ...cleanedData } = data.toObject();
        res.status(200).json(cleanedData);
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });   
    }
};

const listUsers = async(req, res) => {
    try {
        const listUsers = await User.find({});
        res.json(listUsers)
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });   
    }
};

const updateUser = async(req, res) => {
    try {
        const id = req.params.userID;
        const data = await User.findById(id);
        if(!data) {
            return res.status(404).send(`User with id ${id} not found`);
        }
        
        const unpermitted = ['role'];
        const isPermitted = Object.keys(req.body).every((field) => !unpermitted.includes(field));
        if(!isPermitted) {
            return res.status(400).send({ message: 'Invalid updates!' });
        }

        await User.updateOne({ _id:id }, req.body);
        const newData = await User.findById(id);
        const { role, passwordHash, ...cleanedData } = newData;
        res.status(200).json(cleanedData);
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });    
    }
}

const deleteUser = async(req, res) => {
    try {
        const id = req.params.userID;
        const data = await User.findById(id);
        if(!data) {
            return res.status(404).send(`User with ${id} not found`);
        }
        await User.deleteOne({ _id: id });
        res.status(200).send(`User with ${id} deleted`);
    } catch(err) {
        if(err.name==='ValidationError') {
            return res.status(400).json({ message:err.message });
        }
        res.status(500).json({ message: "Internal Server Error" });  
    }
}



module.exports = { addUser, listUsers, updateUser, deleteUser, getUser }