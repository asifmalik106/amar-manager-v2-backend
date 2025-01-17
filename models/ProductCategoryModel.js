let DB = require('../database/DB');

class ProductCategoryModel 
{
    databaseNameRef = 'amar-manager-dev';
    entityName = 'ProductCategory'
    constructor()
    {
        this.dbInstance = new DB();
    }
    async create(data)
    {
        await this.dbInstance.create(data, this.databaseNameRef);
    }

    async countDuplicate(data, indexName){
        return await this.dbInstance.count(data,this.databaseNameRef, indexName)
    }

    async count(){
        return await this.dbInstance.countAndIncrement("productCategory", this.databaseNameRef);
    }
    async getAll()
    {
        return await this.dbInstance.getAllEntities(this.databaseNameRef, this.entityName)
    }
    async getProductCategoryByID(entityID)
    {
        return await this.dbInstance.getEntityByID(this.databaseNameRef, this.entityName, this.entityName+'#'+entityID)
    }
    async updateById(testId, updateData)
    {
        await this.dbInstance.update(testId, updateData, this.databaseNameRef);
    }
    async deleteById(testId)
    {
        await this.dbInstance.deleteById(testId, this.databaseNameRef);
    }
}

module.exports = ProductCategoryModel;