let CategoryModel = require("../models/ProductCategoryModel");
let uuid = require("uuid");
class ProductCategory 
{
    entityPrefix = "ProductCategory"
    #categoryName;
    #categoryUnit;
    constructor(categoryName, categoryUnit)
    {
        this.#categoryName = categoryName;
        this.#categoryUnit = categoryUnit;
    }
    get categoryName()
    {
        return this.#categoryName;
    }
    set categoryName(value)
    {
        this.#categoryName = value;
    }
    get categoryUnit()
    {
        return this.#categoryUnit;
    }
    set categoryUnit(value)
    {
        this.#categoryUnit = value;
    }

    async create()
    {
        let categoryModel = new CategoryModel();
        let sameCount = await categoryModel.countDuplicate({attribute: "categoryName", value: this.#categoryName},"categoryName-index")
        if(sameCount>0){
            throw "Duplicate Entry"
        }
        let count = await categoryModel.count();
        let newCategory = {
            primary_key: "ProductCategory",
            sort_key: "ProductCategory#"+count,
            categoryName: this.#categoryName,
            categoryUnit: this.#categoryUnit
        };
        return await categoryModel.create(newCategory);
    }

    static async getAll(){
        let categoryModel = new CategoryModel();
        let result = await categoryModel.getAll();
        return result;
    }

    async getProductCategoryByID(productCategoryID){
        let categoryModel = new CategoryModel();
        let category = await categoryModel.getProductCategoryByID(productCategoryID);
        if(category.Count==0){
            throw "Wrong Category ID";
        }
        return category;
    }

    async update(key)
    {
        let categoryModel = new CategoryModel();
        let sameCount = await categoryModel.countDuplicate({attribute: "categoryName", value: this.#categoryName},"categoryName-index")
        if(sameCount>0){
            throw "Duplicate Entry"
        }
        console.log("ProductCategory:" + this.#categoryName + " " + this.#categoryUnit)
        let updateCategory = {
            primary_key: "ProductCategory",
            sort_key: "ProductCategory#"+key,
            data: 
            [
                {
                    name: "categoryName",
                    value: this.#categoryName
                },
                {
                    name: "categoryUnit",
                    value: this.#categoryUnit
                }
            ]
        }
        return await categoryModel.update(updateCategory);
    }
}

module.exports = ProductCategory;