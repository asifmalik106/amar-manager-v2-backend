const express = require("express");
const router = express.Router();
const TestController = require("../controllers/TestController");
const authCheck = require("../middleware/authenticateToken")
const CategoryController = require("../controllers/CategoryController");

// GET route as Hello Test
router.get("/api/hello",  TestController.hello);

// POST route to create a new test
router.post("/api/test", TestController.createTest);

// GET All Categories
router.get("/category",  CategoryController.getAllCategories);

// POST route to create a new test
router.post("/category", CategoryController.createCategory);

// GET Single Category Data
router.get("/category/:categoryID", CategoryController.getProductCategoryByID);

// Update Single Category Data
router.put("/category", CategoryController.updateCategory);


// GET route to retrieve all tests
router.get("/api/test",authCheck,  TestController.getAllTests);

// GET route to retrieve a single test by ID
router.get("/api/test/:id", TestController.getTestById);

// PUT route to update a test by ID
router.put("/api/test", TestController.updateTest);

// DELETE route to delete a test by ID
router.delete("/api/test/:id", TestController.deleteTest);

module.exports = router;
