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
        let count = await categoryModel.count();
        let sameCount = await categoryModel.countDuplicate({attribute: "categoryName", value: this.#categoryName},"categoryName-index")
        if(sameCount>0){
            throw "Duplicate Entry"
        }
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
        let result = await categoryModel.getAll("ProductCategory#");
        return result;
    }
}

module.exports = ProductCategory;