import DB from '../database/DB.js';

export default class ProductCategoryModel {
    tableName = 'product_categories';

    constructor(db) {
        this.dbInstance = new DB(db);
    }

    async create(data) {
        return await this.dbInstance.create(data, this.tableName);
    }

    async countDuplicate(data) {
        return await this.dbInstance.count(data, this.tableName);
    }

    async getAll() {
        return await this.dbInstance.getAllEntities(this.tableName);
    }

    async getProductCategoryByID(entityID) {
        return await this.dbInstance.getEntityByID(this.tableName, entityID);
    }

    async update(updateData) {
        return await this.dbInstance.updateEntity(this.tableName, updateData.id, updateData.data);
    }

    async deleteById(id) {
        await this.dbInstance.deleteById(id, this.tableName);
    }
}
