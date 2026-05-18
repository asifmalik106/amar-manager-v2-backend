import TestModel from '../models/TestModel.js';

export default class Test {
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
        const testModel = new TestModel(this.#db);
        const testId = crypto.randomUUID();
        await testModel.create({ id: testId, testName: this.#testName, age: this.#age });
    }

    static async getAllTest(db) {
        const testModel = new TestModel(db);
        return await testModel.readAll();
    }

    async getTestById(testId) {
        const testModel = new TestModel(this.#db);
        return await testModel.readById(testId);
    }

    async updateTestById(testId, updateData) {
        const testModel = new TestModel(this.#db);
        await testModel.updateById(testId, updateData);
    }

    async deleteById(testId) {
        const testModel = new TestModel(this.#db);
        await testModel.deleteById(testId);
    }
}
