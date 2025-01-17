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
        let msg = "Failed to Add New Category. ";
        if(!categoryName){
          msg+= "Category Name is Required. "
        }
        if(!categoryUnit){
          msg+= "Category Unit is Required. "
        }
        return Response.badRequest(res, msg, "Validation Error");
      }

      result = await newProductCategory.create();
      // return res.status(201).json({ status: "success", msg: "Category added successfully"});
      return Response.success(res, "Category added successfully!! Woo Hoo...", result);
    } catch (error) {
      if(error=="Duplicate Entry"){
      return Response.conflict(res, "Same Category Already Exists!", error);

      }
      res.status(500).json({ status: "error", msg: error.toString(), result: result });
    }
  }

  // Read All operation (GET)
  static async getAllCategories(req,res){
    const result = await ProductCategory.getAll();
    try{
      Response.success(res, "Category Retrieve Successful!", result)
    }catch(error){
      Response.badRequest(res,"Something Went Wrong!", error)
    }
  }

    // Read Single ProductCategory by ID (GET)
    static async getProductCategoryByID(req,res){
      let categoryID = req.params.categoryID;
      let category = new ProductCategory;
      let result = await category.getProductCategoryByID(categoryID)
      try{
        Response.success(res, "Category Retrieve Successful!", result)
      }catch(error){
        Response.badRequest(res,"Something Went Wrong!", error)
      }
    }

};
