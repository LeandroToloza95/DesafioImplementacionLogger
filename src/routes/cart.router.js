import { Router } from "express";
import {createCart,
    findCarts,
    findCartById,
    getCartByUser,
    deleteProductByIdInCartById,
    deleteAllProductsInCartById,
    updateProductInCartById,
    updateAllProductInCartById } from "../controllers/carts.controller.js"

const router = Router();

router.post('/', createCart)
router.get('/', findCarts)
router.get('/:idCart', findCartById)
router.get('/getCartByUser/:idUser', getCartByUser)
router.delete('/:idCart/products/:idProduct',deleteProductByIdInCartById)
router.delete('/:idCart', deleteAllProductsInCartById )
router.put('/:idCart/product/:idProduct', updateProductInCartById)
router.put('/:idCart/', updateAllProductInCartById )

export default router