const express = require('express');
const categoryController = require('../controllers/category.controller');
const verifyTokenMiddleware = require('../middleware/verifyToken');

const router = express.Router();

router.post("/",verifyTokenMiddleware.verifyToken, categoryController.save);
router.get("/",verifyTokenMiddleware.verifyToken, categoryController.index);
router.get("/:id",verifyTokenMiddleware.verifyToken, categoryController.show);
router.patch("/:id",verifyTokenMiddleware.verifyToken,categoryController.update);
router.delete("/:id",verifyTokenMiddleware.verifyToken, categoryController.destroy);

module.exports = router;