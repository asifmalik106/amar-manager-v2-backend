let CategoryModel = require("../models/ProductCategoryModel");

class ProductCategory {
    entityPrefix = "ProductCategory";
    #db;
    #categoryName;
    #categoryUnit;

    constructor(db, categoryName, categoryUnit) {
        this.#db = db;
        this.#categoryName = categoryName;
        this.#categoryUnit = categoryUnit;
    }

    get categoryName() { return this.#categoryName; }
    set categoryName(value) { this.#categoryName = value; }
    get categoryUnit() { return this.#categoryUnit; }
    set categoryUnit(value) { this.#categoryUnit = value; }

    async create() {
        let categoryModel = new CategoryModel(this.#db);
        let sameCount = await categoryModel.countDuplicate({ attribute: "categoryName", value: this.#categoryName });
        if (sameCount > 0) {
            throw "Duplicate Entry";
        }
        let newCategory = {
            categoryName: this.#categoryName,
            categoryUnit: this.#categoryUnit
        };
        return await categoryModel.create(newCategory);
    }

    static async getAll(db) {
        let categoryModel = new CategoryModel(db);
        return await categoryModel.getAll();
    }

    async getProductCategoryByID(productCategoryID) {
        let categoryModel = new CategoryModel(this.#db);
        let category = await categoryModel.getProductCategoryByID(productCategoryID);
        if (!category) {
            throw "Wrong Category ID";
        }
        return category;
    }

    async update(key) {
        let categoryModel = new CategoryModel(this.#db);
        let sameCount = await categoryModel.countDuplicate({ attribute: "categoryName", value: this.#categoryName });
        if (sameCount > 0) {
            throw "Duplicate Entry";
        }
        let updateCategory = {
            id: key,
            data: [
                { name: "categoryName", value: this.#categoryName },
                { name: "categoryUnit", value: this.#categoryUnit }
            ]
        };
        return await categoryModel.update(updateCategory);
    }
}

module.exports = ProductCategory;
