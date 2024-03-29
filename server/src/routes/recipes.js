const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipesController.js')
const { verifyToken, authenticateRecipeAction } = require('../middleware/authMiddleware.js')

router.post('/addRecipe/', verifyToken, authenticateRecipeAction, recipeController.addRecipe);
router.get('/listall/', recipeController.listRecipes); 
router.get('/featured/', recipeController.featuredRecipes); 
router.get('/:recipeID/', recipeController.viewRecipe);
router.put('/updateRecipe/:recipeID/', verifyToken, authenticateRecipeAction, recipeController.updateRecipe);
router.delete('/deleteRecipe/:recipeID/', verifyToken, authenticateRecipeAction, recipeController.deleteRecipe)


module.exports = router;