import { cartModel } from "../models/cart.model.js";
import { productManagerClass } from "./productManagerDb.js"
import mongoose from 'mongoose';
class CartsManagerClass {

    async cartByUserId(idUser) {
        try {
            const response = await cartModel.find({ user: idUser })
            if (!response){
                return -1
            }
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
    async getCarts() {
        try {
            const response = await cartModel.find().populate('products.product').lean()
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartsbyID(id) {
        try {
            const response = await cartModel.findById(id).populate('products.product')
            if (!response) {
                return -1
            }
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async createCart(user) {
        try {
            const response = await cartModel.create(user)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(obj) {
        try {
            const { idCart } = obj.params
            const { idProduct } = obj.params
            const { quantity } = obj.body || 1

            const producto = await productManagerClass.getProductsbyID(idProduct);
            const cart = await this.getCartsbyID(idCart)

            if (producto === -1) {
                return -1
            }
            const object = {
                "product": idProduct,
                "quantity": quantity || 1
            }

            const productsInCartToAdd = cart.products
            //console.log(productsInCartToAdd);
            //const prueba = productsInCartToAdd.map(u =>console.log( u.product._id + " " + idProduct))
            
            const productToAdd = productsInCartToAdd.find(u => u.product.id == idProduct) ?? null

            const response = await this.updateCartWithProduct(productToAdd, idCart, idProduct, object)
            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async updateProductsInCart(obj) {
        try {
            const { idCart } = obj.params
            const products = obj.body || null

            const cart = await this.getCartsbyID(idCart)

            if (!cart) {
                return { result: -1, element: "cart", detail: idCart }
            }

            if (!products) {
                return { result: -1, element: "products", detail: "products not found" }
            }
            const response = []
            for (let product of products) {

                let idProduct = product.product
                let quantity = product.quantity

                //valido que exista el producto en la base de productos
                let productValidate = await productManagerClass.getProductsbyID(idProduct)

                if (productValidate !== -1 && quantity) {
                    let object = {
                        "product": idProduct,
                        "quantity": quantity
                    }
                    let productsInCartToAdd = cart.products
                    let productToAdd = productsInCartToAdd.find(u => u.product == idProduct) ?? null

                    try {
                        let responseElement = await this.updateCartWithProduct(productToAdd, idCart, idProduct, object)
                        response.push({ result: 1, element: "product", detail: { productId: idProduct, response: responseElement } })
                    }
                    catch (error) {
                        response.push({ result: -1, element: "product", detail: error.message })
                    }
                } else {
                    response.push({ result: -1, element: "product", detail: `product with id ${idProduct} invalid` })
                }

            }
            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async deleteProductInCart(idCart, idProduct) {

        const response = await cartModel.updateOne({ _id: idCart }, { $pull: { "products": { "product": idProduct } } })
        return response
    }

    async deleteProductsInCart(idCart) {

        const response = await cartModel.updateOne({ _id: idCart }, { $set: { "products": [] } })
        return response
    }
    async deleteCart(id) {
        try {
            const response = await cartModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCartWithProduct(productToAdd, idCart, idProduct, object) {
        
        if (productToAdd === null) {
            const response = await cartModel.updateOne({ _id: idCart }, { $push: { "products": object } })
            return response
        } else {
            const response = await cartModel.updateOne({ _id: idCart, "products.product": idProduct }, { $set: { ["products.$"]: object } })
            return response
        }
    }
}

export const cartManagerClass = new CartsManagerClass();