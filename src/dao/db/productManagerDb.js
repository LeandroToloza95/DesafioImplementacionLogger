import { response } from "express";
import { productModel } from "../models/product.model.js";

class ProductsManagerClass {

    async getProducts(queryObj = null) {
        try {
            const { limit } = queryObj ?? {}
            const { sort } = queryObj ?? {}
            const { page } = queryObj ?? {}
            const { trademark } = queryObj ?? {}

            let order
            if (sort) {
                switch (sort) {
                    case 'ASC':
                        order = 1
                        break;
                    case 'DESC':
                        order = -1
                        break;
                    default:
                        order = 1
                        break;
                }
            }
            console.log(trademark);
            const response = await productModel.paginate({  }, { limit: limit, page: page, sort: { trademark: order } })

            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async getProductsbyID(idProducto) {
        try {
            const product = await productModel.findById(idProducto).lean()
            if (!product) {
                const response = -1
                return response
            }
            const response = product

            return response

        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(obj) {
        try {
            const response = await productModel.create(obj)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(idProducto, obj) {
        try {
            const response = await productModel.findByIdAndUpdate({ _id: idProducto }, { $set: obj })
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteProduct(idProducto) {
        try {
            const response = await productModel.findByIdAndDelete({ _id: idProducto })
            if (!response) {
                return -1
            }
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const productManagerClass = new ProductsManagerClass();