const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      items,
      paymentMethod = "COD",
    } = req.body;

    if (
      !customerName?.trim() ||
      !phone?.trim() ||
      !address?.trim()
    ) {
      return res.status(400).json({
        message: "Name, phone and address are required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    if (!["COD", "ONLINE"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    const menuIds = items.map((item) => item.foodId);

    if (
      menuIds.some(
        (id) => !id || !mongoose.isValidObjectId(id)
      )
    ) {
      return res.status(400).json({
        message: "Invalid food ID",
      });
    }

    const Menu = require("../models/Menu");

    if (!Menu) {
      return res.status(500).json({
        message: "Menu model is not registered",
      });
    }

    const uniqueIds = [...new Set(menuIds.map(String))];

    const foods = await Menu.find({
      _id: { $in: uniqueIds },
      available: true,
    });

    if (foods.length !== uniqueIds.length) {
      return res.status(400).json({
        message: "Some food items were not found",
      });
    }

    const orderItems = [];

    for (const item of items) {
      const food = foods.find(
        (food) => String(food._id) === String(item.foodId)
      );

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 50
      ) {
        return res.status(400).json({
          message: "Invalid item quantity",
        });
      }

      const price = Number(food.price);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          message: "Invalid food price",
        });
      }

      orderItems.push({
        foodId: food._id,
        name: food.name,
        price,
        quantity,
      });
    }

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (paymentMethod === "ONLINE") {
      return res.status(400).json({
        message: "Online payment is not set up yet. Please use COD.",
      });
    }

    const order = await Order.create({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: orderItems,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Unable to place order",
    });
  }
});

module.exports = router;