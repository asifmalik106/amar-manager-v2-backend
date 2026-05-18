import DB from '../database/DB.js';

export default class TestModel {
    tableName = 'tests';

    constructor(db) {
        this.dbInstance = new DB(db);
    }

    async create(data) {
        await this.dbInstance.create(data, this.tableName);
    }

    async readAll() {
        return await this.dbInstance.getAllData(this.tableName);
    }

    async readById(testId) {
        const results = await this.dbInstance.getDataById(testId, this.tableName);
        return results.length > 0 ? results[0] : null;
    }

    async updateById(testId, updateData) {
        const updates = Object.entries(updateData)
            .filter(([key]) => key !== 'id')
            .map(([name, value]) => ({ name, value }));
        await this.dbInstance.updateEntity(this.tableName, testId, updates);
    }

    async deleteById(testId) {
        await this.dbInstance.deleteById(testId, this.tableName);
    }
}
