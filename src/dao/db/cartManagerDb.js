import { cartModel } from "../models/cart.model.js";
import {productManagerClass} from "./productManagerDb.js"
import mongoose from 'mongoose';
class  CartsManagerClass{
    
        async getCarts(){
            try{
                const response = await cartModel.find()
                return response
            } catch (error) {
                throw new Error(error);
            }
        }

        async getCartsbyID(id){
            try{
                const response = await cartModel.findById(id)
                if(!response){
                    return -1
                }
                return response
            } catch (error) {
                throw new Error(error);
            }
        }

        async createCart(obj){
            try{
                const response = await cartModel.create(obj)
                return response
            } catch (error) {
                throw new Error(error);
            }
        }

        async addProductToCart(params){
            try{
                const { idCart } = params
                const { idProduct } = params  
                const producto = await productManagerClass.getProductsbyID(idProduct);
                const cart = await this.getCartsbyID(idCart)
                if(!producto){
                    return -1
                }

                const productsInCartToAdd = cart.products
                const productToAdd = productsInCartToAdd.find(u => u.idProduct === idProduct) ?? null

                let obj
                if(!productToAdd){
                    
                    obj=         {
                        "idProduct": idProduct,
                        "quantity": 1
                    }
                    const response = await cartModel.updateOne({_id:idCart},{$push: {"products" : obj}})
                    return response
                }else{
                    const quantityProductToadd = productToAdd.quantity + 1
                    console.log(2);
                    obj=         {
                        "idProduct": idProduct,
                        "quantity": quantityProductToadd
                    }
                    const response = await cartModel.updateOne({_id:idCart,"products.idProduct": idProduct},{$set: {["products.$"]: obj}})
                    return response
                }
            } catch (error) {
                throw new Error(error);
            }
        }

        async deleteCart(id){
            try{
                const response = await cartModel.findByIdAndDelete(id)
                return response
            } catch (error) {
                throw new Error(error);
            }
        }

}

export const cartManagerClass = new CartsManagerClass();