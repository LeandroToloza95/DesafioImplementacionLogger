import { productModel } from "../models/product.model.js";

class  ProductsManagerClass{

    async getProducts(queryObj = null) {
        const response = await productModel.find()
        return response
    }

   async getProductsbyID(idProducto) {
        const response = await studentModel.findById(idProducto)
        return response
    }

    async addProduct(obj) {
        const response = await studentModel.create(obj)
        return response
    }    

    async updateProduct(idProducto, obj) {
        const response = await studentModel.updateOne({_id:idProducto},{obj})
        return response
    }
    async deleteProduct(idProducto) {
        const response = await studentModel.findByIdAndDelete({_id:idProducto})
        return response
    }

}


export const ProductsManager = new ProductsManagerClass();