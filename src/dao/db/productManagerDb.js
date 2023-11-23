import { response } from "express";
import { productModel } from "../models/product.model.js";

class ProductsManagerClass {

    async getProducts(queryObj = null) {
        try {
            const limit = queryObj?.limit ?? 100
            const sort = queryObj?.sort ?? {}
            const page = queryObj?.page ?? 1
            const { query } = queryObj ?? {}

            const queryObject = JSON.parse((query || '{}'));

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

            const result = await productModel.paginate(queryObject, { limit: limit, page: page, sort: { precio: order } })
            const info = {
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : null,
                hasNextPage: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : null

            }

            return { status: 'success', payload: result.docs, info }
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