import { Router } from "express";
import { cartManagerClass } from '../dao/db/cartManagerDb.js'

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManagerClass.createCart({})
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
        if (cart === -1) {
            return res.status(400).json({ message: `Cart not found`})
        }
        return res.status(200).json({ message: `Cart with id: ${idCart} succesfully Updated`, cart: cart })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default router