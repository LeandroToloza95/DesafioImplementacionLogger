import { cartModel } from "../models/cart.model.js";
import { productManagerClass } from "./productManagerDb.js"
import mongoose from 'mongoose';
class CartsManagerClass {

    async getCarts() {
        try {
            const response = await cartModel.find()
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartsbyID(id) {
        try {
            const response = await cartModel.findById(id)
            if (!response) {
                return -1
            }
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async createCart(obj) {
        try {
            const response = await cartModel.create(obj)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(obj) {
        try {
            const { idCart } = obj.params
            const { idProduct } = obj.params
            const { quantity } = obj.query || 1

            const producto = await productManagerClass.getProductsbyID(idProduct);
            const cart = await this.getCartsbyID(idCart)

            if (!producto) {
                return -1
            }

            const productsInCartToAdd = cart.products
            const productToAdd = productsInCartToAdd.find(u => u.product == idProduct) ?? null

            const object = {
                "product": idProduct,
                "quantity": quantity
            }
            if (productToAdd === null) {
                const response = await cartModel.updateOne({ _id: idCart }, { $push: { "products": object } })
                return response
            } else {
                const response = await cartModel.updateOne({ _id: idCart, "products.product": idProduct }, { $set: { ["products.$"]: object } })
                return response
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async updateProductsInCart(obj) {
        try {
            const {idCart} = obj.params
            const { query } = obj.query || null
            const cart = await this.getCartsbyID(idCart)
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async deleteCart(id) {
        try {
            const response = await cartModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const cartManagerClass = new CartsManagerClass();