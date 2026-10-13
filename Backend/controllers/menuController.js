const Menu = require("../models/Menu");

// Add food item
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const menuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image,
      available,
    });

    res.status(200).json({
      message: "Food item added successfully",
      menuItem,
    });
  } catch (error) {
    console.error("Error adding food:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all food items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();

    res.status(200).json({
      menuItems,
    });
  } catch (error) {
    console.error("Error getting menu:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

//Update food item
const updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error("Error updating menu item:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

//Delete food item
const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item deleted successfully",
      deletedItem,
    });
  }
  catch (error) {
    console.error("Error deleting menu item:", error.message);  


    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
};


