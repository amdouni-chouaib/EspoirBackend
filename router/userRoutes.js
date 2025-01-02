const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

// Create a new user
router.post('/createUser', userController.createUser);

// Get all users
router.get('/getusers', userController.getAllUsers);

// Get a user by ID
router.get('/getuser/:id', userController.getUserById);

// Update a user
router.put('/updateuser/:id', userController.updateUser);

router.put('/updateuserp/:id', userController.updateUserP);

// Delete a user
router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;
