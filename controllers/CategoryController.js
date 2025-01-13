let Test = require("../services/ProductCategory");
let { getLanguage, getMessage } = require("../config/language");
module.exports = class CategoryController {
  
    // Read operation (GET all tests)
    static async hello(req, res) {
      res.status(200).json({ status: "success", msg: "Hello World! Amar Manager v2 Category Controller" });
    }

  // Create operation (POST)
  static async createCategory(req, res) {
    try {
      let { categoryName, categoryUnit } = req.body;
      let  newProductCategory = new ProductCategory(categoryName, categoryUnit);
      await newProductCategory.create();
      return res.status(201).json({ status: "success", msg: "Category added successfully"});
    } catch (error) {
      res.status(500).json({ status: "error", msg: error });
    }
  }

};
