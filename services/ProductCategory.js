import CategoryModel from '../models/ProductCategoryModel.js';

export default class ProductCategory {
    entityPrefix = 'ProductCategory';
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
        const categoryModel = new CategoryModel(this.#db);
        const sameCount = await categoryModel.countDuplicate({ attribute: 'categoryName', value: this.#categoryName });
        if (sameCount > 0) throw 'Duplicate Entry';
        return await categoryModel.create({ categoryName: this.#categoryName, categoryUnit: this.#categoryUnit });
    }

    static async getAll(db) {
        const categoryModel = new CategoryModel(db);
        return await categoryModel.getAll();
    }

    async getProductCategoryByID(productCategoryID) {
        const categoryModel = new CategoryModel(this.#db);
        const category = await categoryModel.getProductCategoryByID(productCategoryID);
        if (!category) throw 'Wrong Category ID';
        return category;
    }

    async update(key) {
        const categoryModel = new CategoryModel(this.#db);
        const sameCount = await categoryModel.countDuplicate({ attribute: 'categoryName', value: this.#categoryName });
        if (sameCount > 0) throw 'Duplicate Entry';
        return await categoryModel.update({
            id: key,
            data: [
                { name: 'categoryName', value: this.#categoryName },
                { name: 'categoryUnit', value: this.#categoryUnit }
            ]
        });
    }
}
