let ProductCategory = require("../services/ProductCategory");
let { getLanguage, getMessage } = require("../config/language");
let Response = require("../services/Response");
module.exports = class CategoryController {
  
    // Read operation (GET all tests)
    static async hello(req, res) {
      res.status(200).json({ status: "success", msg: "Hello World! Amar Manager v2 Category Controller" });
    }

  // Create operation (POST)
  static async createCategory(req, res) {
    let result;
    try {
      let { categoryName, categoryUnit } = req.body;
      let  newProductCategory = new ProductCategory(categoryName, categoryUnit);

      if (!categoryName || !categoryUnit) {
        let msg = "Failed to Add New Category.";
        if(!categoryName){
          msg+= "\nCategory Name is Required"
        }
        if(!categoryUnit){
          msg+= "\nCategory Unit is Required"
        }
        return Response.badRequest(res, msg, "Validation Error");
      }

      result = await newProductCategory.create();
      // return res.status(201).json({ status: "success", msg: "Category added successfully"});
      return Response.success(res, "Category added successfully!! Woo Hoo...", result);
    } catch (error) {
      res.status(500).json({ status: "error", msg: error.toString(), result: result });
    }
  }

};
