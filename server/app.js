require('dotenv').config();
const express = require('express');
const app = express();
const recipeRouter = require('./src/routes/recipes.js')
const userRouter = require('./src/routes/users.js')
const loginController = require('./src/controllers/loginContoller.js')

const mongoose = require('mongoose');

const port = 3001;  //open up port 3001 for now

mongoose.connect('mongodb://localhost:27017/recipeDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/recipes', recipeRouter)
app.use('/users', userRouter)
app.get('/login', loginController.authentication)

//listenng on port 3001 for now
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})