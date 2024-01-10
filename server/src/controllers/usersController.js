const User = require('../models/User.js')
const mongoose = require('mongoose');

const addUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
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
        await User.updateOne({ _id:id }, req.body);
        const newData = await User.findById(id)
        res.status(200).json(newData);
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



module.exports = { addUser, listUsers, updateUser, deleteUser }