import { Router } from "express";
import { productController } from "../controllers/products.controller.js";

const router = Router();

router.get('/mockingproducts', productController.createProductMoking )

export default router