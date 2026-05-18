import ProductCategory from '../services/ProductCategory.js';
import { getLanguage, getMessage } from '../config/language.js';
import Response from '../services/Response.js';

export default class CategoryController {

    static async hello(c) {
        return c.json({ status: 'success', msg: 'Hello World! Amar Manager v2 Category Controller' });
    }

    static async createCategory(c) {
        let result;
        try {
            const { categoryName, categoryUnit } = await c.req.json();
            const newProductCategory = new ProductCategory(c.env.DB, categoryName, categoryUnit);

            if (!categoryName || !categoryUnit) {
                let msg = 'Failed to Add New Category. ';
                if (!categoryName) msg += 'Category Name is Required. ';
                if (!categoryUnit) msg += 'Category Unit is Required. ';
                return Response.badRequest(c, msg, 'Validation Error');
            }

            result = await newProductCategory.create();
            return Response.success(c, 'Category added successfully!! Woo Hoo...', result);
        } catch (error) {
            if (error === 'Duplicate Entry') {
                return Response.conflict(c, 'Same Category Already Exists!', error);
            }
            return c.json({ status: 'error', msg: error.toString(), result }, 500);
        }
    }

    static async updateCategory(c) {
        let result;
        try {
            const { key, categoryName, categoryUnit } = await c.req.json();
            const productCategory = new ProductCategory(c.env.DB, categoryName, categoryUnit);

            if (!categoryName || !categoryUnit) {
                let msg = 'Failed to Update Category. ';
                if (!categoryName) msg += 'Category Name is Required. ';
                if (!categoryUnit) msg += 'Category Unit is Required. ';
                return Response.badRequest(c, msg, 'Validation Error');
            }

            result = await productCategory.update(key);
            return Response.success(c, 'Category Updated successfully!! Woo Hoo...', result);
        } catch (error) {
            if (error === 'Duplicate Entry') {
                return Response.conflict(c, 'Same Category Already Exists!', error);
            }
            return c.json({ status: 'error', msg: error.toString(), result }, 500);
        }
    }

    static async getAllCategories(c) {
        try {
            const result = await ProductCategory.getAll(c.env.DB);
            return Response.success(c, 'Category Retrieve Successful!', result);
        } catch (error) {
            return Response.badRequest(c, 'Something Went Wrong!', error);
        }
    }

    static async getProductCategoryByID(c) {
        const categoryID = c.req.param('categoryID');
        const category = new ProductCategory(c.env.DB);
        let result;
        try {
            result = await category.getProductCategoryByID(categoryID);
            return Response.success(c, 'Category Retrieve Successful!', result);
        } catch (error) {
            if (error === 'Wrong Category ID') {
                return Response.conflict(c, 'Category Does Not Exists!', error);
            }
            return Response.badRequest(c, 'Something Went Wrong!', JSON.stringify(error));
        }
    }
}
