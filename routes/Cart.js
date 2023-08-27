const express = require("express");
const { AddToCart, fetchCartByUser, deleteFromCart, updateCart } = require("../controller/Cart");
const router = express.Router();

router.post('/',AddToCart)
      .get('/',fetchCartByUser)
      .delete('/:id',deleteFromCart)
      .patch('/:id',updateCart)
     
exports.router = router;
