let TestModel = require("../models/TestModel");

class Test {
    #db;
    #testName;
    #age;

    constructor(db, testName, age) {
        this.#db = db;
        this.#testName = testName;
        this.#age = age;
    }

    get testName() { return this.#testName; }
    set testName(value) { this.#testName = value; }
    get age() { return this.#age; }
    set age(value) { this.#age = value; }

    async create() {
        let testModel = new TestModel(this.#db);
        let testId = crypto.randomUUID();
        let newTest = {
            id: testId,
            testName: this.#testName,
            age: this.#age
        };
        await testModel.create(newTest);
    }

    static async getAllTest(db) {
        let testModel = new TestModel(db);
        return await testModel.readAll();
    }

    async getTestById(testId) {
        let testModel = new TestModel(this.#db);
        return await testModel.readById(testId);
    }

    async updateTestById(testId, updateData) {
        let testModel = new TestModel(this.#db);
        await testModel.updateById(testId, updateData);
    }

    async deleteById(testId) {
        let testModel = new TestModel(this.#db);
        await testModel.deleteById(testId);
    }
}

module.exports = Test;
