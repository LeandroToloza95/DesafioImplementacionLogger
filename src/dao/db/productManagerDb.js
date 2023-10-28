import { response } from "express";
import { productModel } from "../models/product.model.js";

class ProductsManagerClass {

    async getProducts(queryObj = null) {
        try {
            const { limit } = (queryObj ?? null)
            const { sort } = (queryObj ?? null)
            const { page } = (queryObj ?? null)
            const { trademark } = (queryObj ?? null)
            
            const response = await productModel.paginate()
            
            return response
        } catch (error) {
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
            const response = await productModel.findByIdAndUpdate({ _id: idProducto }, {$set: obj})
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteProduct(idProducto) {
        try {
            const response = await productModel.findByIdAndDelete({ _id: idProducto }) 
            if (!response){
                return -1
            }
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const productManagerClass = new ProductsManagerClass();