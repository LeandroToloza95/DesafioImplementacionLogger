import { response } from "express";
import { productModel } from "../models/product.model.js";

class ProductsManagerClass {

    async getProducts(limit,order,page) {
        try {
            const result = await productModel.paginate({}, { limit: limit, page: page, sort: { precio: order } })
            return result      
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async getProductsbyID(idProducto) {
        try {
            const product = await productModel.findById(idProducto).lean()
            return product
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

    async deleteProduct(idProducto) {
        try {
            const response = await productModel.findByIdAndDelete({ _id: idProducto })
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

}

export const productManagerClass = new ProductsManagerClass();