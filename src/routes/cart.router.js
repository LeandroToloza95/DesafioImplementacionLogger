import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";
import {authMiddleware} from '../middlewares/auth.middleware.js'
import passport from "passport";

const router = Router();

router.post('/', cartController.createCart)
router.get('/', cartController.findCarts)
router.get('/:idCart', cartController.findCartById)
router.get('/getCartByUser/:idUser', cartController.getCartByUser)
router.delete('/:idCart/products/:idProduct',cartController.deleteProductByIdInCartById)
router.delete('/:idCart', cartController.deleteAllProductsInCartById )
router.put('/:idCart/product/:idProduct',passport.authenticate('jwt', { session: false }),authMiddleware(['user']), cartController.updateProductInCartById)
router.put('/:idCart/', cartController.updateAllProductInCartById )

export default router

