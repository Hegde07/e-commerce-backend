const express = require("express");
const {createProduct} = require('../controller/Product')


const router = express.Router();

router.post('/',createProduct);

exports.router = router;
