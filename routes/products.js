const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

router.get("/get-all", productController.getAll);

router.post("/edit", productController.editProduct);

router.get("/remove-product", productController.removeProduct);

module.exports = router;
