const express = require('express');
const { addMenuItem, getMenuItems , updateMenuItem, deleteMenuItem} = require('../controllers/menuController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Add food item - protected 
router.post('/add', authMiddleware, addMenuItem);

//Get all food items - public
router.get('/', getMenuItems);

//Update food item - protected
router.put('/update/:id', authMiddleware, updateMenuItem);

//Delete food item - protected
router.delete('/delete/:id', authMiddleware, deleteMenuItem);

module.exports = router;