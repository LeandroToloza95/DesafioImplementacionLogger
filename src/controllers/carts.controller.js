import { cartManagerClass } from '../dao/db/cartManagerDb.js'
import { productManagerClass } from "../dao/db/productManagerDb.js";
import {userManagerClass} from "../dao/db/userManagerDb.js";

export const createCart = async (req, res) => {
    try {
        const newCart = await cartManagerClass.createCart()
        return res.status(200).json({ message: `New cart created with id ${newCart._id}`, cart: newCart })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const findCarts = async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await carbtManagerClass.getCarts()
        if (carrito === -1) {
            return res.status(400).json({ message: 'Carts no found' })
        }
        return res.status(200).json({ message: `Carts found`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const findCartById = async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await cartManagerClass.getCartsbyID(idCart)
        if (carrito === -1) {
            return res.status(400).json({ message: 'Cart no found' })
        }
        return res.status(200).json({ message: `Cart with id ${carrito._id}`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCartByUser = async (req, res) => {
    try {
        const { idUser } = req.params
        const user = await userManagerClass.getUsersbyID(idUser)
        const carrito = await cartManagerClass.getCartsbyID(user.cart)
        if (carrito === -1) {
            return res.status(400).json({ message: `Cart no found with id user: ${idUser}` })
        }
        return res.status(200).json({ message: `Cart with id ${user.cart} from id user: ${idUser}`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProductByIdInCartById = async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await cartManagerClass.getCartsbyID(idCart)
        if (carrito === -1) {
            return res.status(400).json({ message: 'Cart no found' })
        }

        const { idProduct } = req.params
        const product = await productManagerClass.getProductsbyID(idProduct)
        if (product === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }

        const response = await cartManagerClass.deleteProductInCart(idCart,idProduct)
        if (response.modifiedCount !== 0){
            return res.status(200).json({ message: `Product ${idProduct} in Cart ${carrito._id} deleted`})
        }
        return res.status(400).json({ message: 'Product no found in cart' })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAllProductsInCartById = async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await cartManagerClass.getCartsbyID(idCart)
        if (carrito === -1) {
            return res.status(400).json({ message: 'Cart no found' })
        }

        const response = await cartManagerClass.deleteProductsInCart(idCart)
        if (response.modifiedCount !== 0){
            return res.status(200).json({ message: `Products in Cart ${carrito._id} deleted`})
        }
        return res.status(400).json({ message: 'Products no found in cart' })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}