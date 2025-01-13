let CategoryModel = require("../models/ProductCategoryModel");
let uuid = require("uuid");
class ProductCategory 
{
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
        let newCategory = {
            id: "ProductCategory#"+count,
            categoryName: this.#categoryName,
            categoryUnit: this.#categoryUnit
        };
        await categoryModel.create(newCategory);
    }
    static async getAllTest()
    {
        let testModel = new TestModel();
        return await testModel.readAll();
    }
    async getTestById(testId)
    {
        let testModel = new TestModel();
        return await testModel.readById(testId);
    }
    async updateTestById(testId, updateData)
    {
        let testModel = new TestModel();
        await testModel.updateById(testId, updateData);
    }
    async deleteById(testId)
    {
        let testModel = new TestModel();
        await testModel.deleteById(testId);
    }
}

module.exports = Test;