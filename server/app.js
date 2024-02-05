require('dotenv').config();
const express = require('express');
const app = express();
const recipeRouter = require('./src/routes/recipes.js')
const userRouter = require('./src/routes/users.js')
const loginController = require('./src/controllers/loginContoller.js')
const recipeController = require('./src/controllers/recipesController.js')
const logoutController = require('./src/controllers/logoutController.js')
const verifyTokenController = require('./src/controllers/verifyTokenController.js')
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mongoose = require('mongoose');
const { verifyToken } = require('./src/middleware/authMiddleware.js');

const port = 3001;  //open up port 3001 for now

mongoose.connect('mongodb://localhost:27017/recipeDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/recipes', recipeRouter)
app.use('/users', userRouter)
app.post('/login', loginController.authentication)
app.post('/logout', logoutController)
app.post('/verifyToken', verifyToken, verifyTokenController)

//listening on port 3001 for now
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})