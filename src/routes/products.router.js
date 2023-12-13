import { Router } from "express";

import {
    findProducts,
    findProductById,
    createProduct,
    deleteProductById,
    updateProductById
} from "../controllers/products.controller.js"

const router = Router();

//con multer para subir imagenes
//router.post('/',upload.single('productimage'), async (req, res) => {
router.post('/', createProduct )
router.get('/', findProducts)
router.get('/:idproduct', findProductById )
router.delete('/:idproduct', deleteProductById )
router.put('/:idproduct', updateProductById )

export default router