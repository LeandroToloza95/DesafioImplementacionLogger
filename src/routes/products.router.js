import { Router } from "express";
import { productManagerClass } from '../productManager.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get('/', async (req, res) => {
    try {

        const { limit } = req.query
        const { order } = req.query
        const productos = await productManagerClass.getProducts(req.query)

        if (!productos.length) {
            return res.status(200).json({ message: 'No products found' })
        }

        let mensajeLimite = 'without limit'
        if (limit && +limit > 0) {
            mensajeLimite = `limited to ${limit} elements`
        }

        let mensajeOrden = 'without order'
        if (order && (order == 'DESC' || order == 'ASC')) {
            mensajeOrden = `ordered to ${order}`
        }

        return res.status(200).json({ message: `Products found ` + mensajeLimite + " " + mensajeOrden, "products": productos })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
})

router.get('/:idproduct', async (req, res) => {

    try {
        const { idproduct } = req.params
        const productos = await productManagerClass.getProductsbyID(+idproduct)
        if (productos === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }
        return res.status(200).json({ message: `Products with id ${idproduct}`, products: productos })

    }
    catch (error) {
        return res.status(500).json({ message: error })
    }

})

//con multer para subir imagenes
//router.post('/',upload.single('productimage'), async (req, res) => {
router.post('/', async (req, res) => {
    //validacion del body de campos obligatorios
    const { title, description, price, trademark, status, category, code, stock } = req.body


    if (!title || !description || !price || !trademark || !status || !category || !code || !stock) {
        return res.status(400).json({ message: 'Information sent is incompleted' })
    }
    try {
        const newProduct = await productManagerClass.addProduct(req.body)

        return res.status(200).json({ message: `New products created with id ${newProduct.id}`, products: newProduct })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
})

router.delete('/:idproduct', async (req, res) => {
    try {
        // console.log(req.params);
        const { idproduct } = req.params
        const productDeleted = await productManagerClass.deleteProduct(+idproduct)

        if (productDeleted === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }

        return res.status(200).json({ message: `Product deleted with id ${productDeleted[0].id}`, products: productDeleted })

    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
})

router.put('/:idproduct', async (req, res) => {
    try {
        // console.log(req.params);
        const { idproduct } = req.params
        const obj = req.body
        const productUpdated = await productManagerClass.updateProduct(+idproduct, obj)

        if (productUpdated === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }

        return res.status(200).json({ message: `Product updated with id ${productUpdated.id}`, products: productUpdated })

    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router