import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
import {authMiddleware} from '../middlewares/auth.middleware.js'
import passport from "passport";

const router = Router();

router.post('/',passport.authenticate('jwt', { session: false }),authMiddleware(['admin']), productController.createProduct )
router.get('/', productController.findProducts)
router.get('/:idproduct', productController.findProductById )
router.delete('/:idproduct',passport.authenticate('jwt', { session: false }),authMiddleware(['admin']), productController.deleteProductById )
router.put('/:idproduct',passport.authenticate('jwt', { session: false }),authMiddleware(['admin']), productController.updateProductById )

export default router