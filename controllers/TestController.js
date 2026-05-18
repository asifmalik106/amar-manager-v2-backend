let Test = require("../services/Test");
let { getLanguage, getMessage } = require("../config/language");

module.exports = class TestController {

    static async hello(c) {
        return c.json({ status: "success", msg: "Hello World! Amar Manager v2 is Live Now!" });
    }

    static async getAllTests(c) {
        try {
            let tests = await Test.getAllTest(c.env.DB);
            return c.json(tests);
        } catch (error) {
            return c.json({ status: "error", msg: error.toString() }, 500);
        }
    }

    static async getTestById(c) {
        try {
            let testId = c.req.param('id');
            let test = new Test(c.env.DB);
            let data = await test.getTestById(testId);
            if (data) {
                return c.json(data);
            } else {
                return c.json({ status: "error", msg: "Test Not Found" }, 404);
            }
        } catch (error) {
            return c.json({ status: "error", msg: error.toString() }, 500);
        }
    }

    static async createTest(c) {
        try {
            let { testName, age } = await c.req.json();
            let newTest = new Test(c.env.DB, testName, age);
            await newTest.create();
            return c.json({ status: "success", msg: "Test added successfully" }, 201);
        } catch (error) {
            return c.json({ status: "error", msg: error.toString() }, 500);
        }
    }

    static async updateTest(c) {
        try {
            let body = await c.req.json();
            if (!body.id || body.id.trim() === '') {
                return c.json({ status: "error", msg: "Bad request. ID is mandatory." }, 400);
            }
            let test = new Test(c.env.DB);
            await test.updateTestById(body.id, body);
            return c.json({ status: "success", msg: "Test updated successfully." }, 202);
        } catch (error) {
            return c.json({ status: "error", msg: error.toString() }, 500);
        }
    }

    static async deleteTest(c) {
        try {
            let test = new Test(c.env.DB);
            await test.deleteById(c.req.param('id'));
            return c.json({ status: "success", msg: "Test deleted successfully" });
        } catch (error) {
            return c.json({ status: "error", msg: error.toString() }, 500);
        }
    }
};
