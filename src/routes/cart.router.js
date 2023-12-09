import { Router } from "express";
import {createCart,findCarts,findCartById,getCartByUser,deleteProductByIdInCartById, deleteAllProductsInCartById } from "../controllers/carts.controller.js"

import { cartManagerClass } from '../dao/db/cartManagerDb.js'
import { productManagerClass } from "../dao/db/productManagerDb.js";
import { userManagerClass } from "../dao/db/userManagerDb.js";

const router = Router();

router.post('/', createCart)

router.get('/', findCarts)

router.get('/:idCart', findCartById)

router.get('/getCartByUser/:idUser', getCartByUser)

/*
router.delete('/:idCart', async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await cartManagerClass.deleteCart(idCart)
        if (carrito === -1) {
            return res.status(400).json({ message: 'Cart no found' })
        }
        return res.status(200).json({ message: `Cart with id ${carrito._id} deleted`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
*/
router.delete('/:idCart/products/:idProduct',deleteProductByIdInCartById)

router.delete('/:idCart', deleteAllProductsInCartById )

router.put('/:idCart/product/:idProduct', async (req, res) => {
    try {

        const { idCart } = req.params;
        const { idProduct } = req.params;
        const cart = await cartManagerClass.addProductToCart(req)
        if (cart === -1) {
            return res.status(400).json({ message: `Product with id: ${idProduct} not found`})
        }
        return res.status(200).json({ message: `Product with id: ${idProduct} loaded to cart with id: ${idCart} succesfully`, cart: cart })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put('/:idCart/', async (req, res) => {
    try {
        
        const { idCart } = req.params;
        const cart = await cartManagerClass.updateProductsInCart(req)

        if (cart.result === -1) {
            return res.status(400).json({ message: cart.detail})
        }

        return res.status(200).json({ message: `Cart with id: ${idCart} succesfully Updated`, cart: cart })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default router