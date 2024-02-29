const express = require('express');
const app = express();
const recipeRouter = require('./src/routes/recipes.js')
const userRouter = require('./src/routes/users.js')
const loginController = require('./src/controllers/loginContoller.js')
const recipeController = require('./src/controllers/recipesController.js')
const logoutController = require('./src/controllers/logoutController.js')
const verifyTokenController = require('./src/controllers/verifyTokenController.js')
const cors = require('cors');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
})

app.use(cors({
    credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mongoose = require('mongoose');
const { verifyToken } = require('./src/middleware/authMiddleware.js');


mongoose.connect('mongodb://3.80.172.73:27017/recipeDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/recipes', recipeRouter)
app.use('/users', userRouter)
app.post('/login', loginController.authentication)
app.post('/logout', logoutController)
app.post('/verifyToken', verifyToken, verifyTokenController)

