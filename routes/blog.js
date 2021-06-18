const express = require('express');
const blogController = require('../controllers/blog.controller');
const verifyTokenMiddleware = require('../middleware/verifyToken');
const imageUpload = require('../middleware/imageUpload');

const router = express.Router();
 router.post("/",verifyTokenMiddleware.verifyToken,imageUpload.upload.fields([{name: 'blogImage', maxCount: 8}]),blogController.createBlog);
 router.get("/",verifyTokenMiddleware.verifyToken, blogController.showBlog);
 router.get("/:id",verifyTokenMiddleware.verifyToken,blogController.showById);
 router.patch("/:id",verifyTokenMiddleware.verifyToken,imageUpload.upload.fields([{name: 'blogImage', maxCount: 8}]),blogController.update);
// router.delete("/:id",verifyTokenMiddleware.verifyToken, blogController.destroy);

module.exports = router;


