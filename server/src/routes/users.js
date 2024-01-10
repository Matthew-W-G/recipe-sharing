const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js')
const { verifyToken, authenticateUserAction } = require('../middleware/authMiddleware.js')

router.post('/adduser/', usersController.addUser);
router.get('/listall/', usersController.listUsers);
router.put('/updateUser/:userID', verifyToken, authenticateUserAction, usersController.updateUser);
router.delete('/deleteUser/:userID', verifyToken, authenticateUserAction, usersController.deleteUser);

module.exports = router;