import { Router } from "express";
import { cartManagerClass } from '../dao/db/cartManagerDb.js'
import { productManagerClass } from "../dao/db/productManagerDb.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManagerClass.createCart()
        return res.status(200).json({ message: `New cart created with id ${newCart._id}`, cart: newCart })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
})

router.get('/', async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await cartManagerClass.getCarts()
        if (carrito === -1) {
            return res.status(400).json({ message: 'Carts no found' })
        }
        return res.status(200).json({ message: `Carts found`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/:idCart', async (req, res) => {
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
})

router.get('/getCartByUser/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params
        const carrito = await cartManagerClass.cartByUserId(idUser)
        if (carrito === -1) {
            return res.status(400).json({ message: `Cart no found with id user: ${idUser}` })
        }
        return res.status(200).json({ message: `Cart with id ${carrito._id}`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

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
router.delete('/:idCart/products/:idProduct', async (req, res) => {
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
})

router.delete('/:idCart', async (req, res) => {
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
})

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