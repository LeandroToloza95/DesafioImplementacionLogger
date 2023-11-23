import { Router } from "express";
import { productManagerClass } from '../dao/db/productManagerDb.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get('/', async (req, res) => {
    try {

        const limit = req.query.limit ?? 10
        const { sort } = (req.query ?? null)

        const productos = await productManagerClass.getProducts(req.query)

        if (!productos) {
            return res.status(200).json({ message: 'No products found' })
        }

        let mensajeLimite = 'without limit'
        if (limit && +limit > 0) {
            mensajeLimite = `limited to ${limit} elements`
        }

        let mensajeOrden = 'without sort'
        if (sort && (sort == 'DESC' || sort == 'ASC')) {
            mensajeOrden = `ordered to ${sort}`
        }

        return res.status(200).json({ message: `Products found ` + mensajeLimite + " " + mensajeOrden, "payload": productos })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/:idproduct', async (req, res) => {

    try {
        const { idproduct } = req.params
        const productos = await productManagerClass.getProductsbyID(idproduct)
        if (productos === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }
        return res.status(200).json({ message: `Products with id ${idproduct}`, products: productos })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

})

//con multer para subir imagenes
//router.post('/',upload.single('productimage'), async (req, res) => {
router.post('/', async (req, res) => {
    try {
        //validacion del body de campos obligatorios
        const { title, description, price, trademark, status, category, code, stock } = req.body

        if (!title || !description || !price || !trademark || !status || !category || !code || !stock) {
            return res.status(400).json({ message: 'Information sent is incompleted' })
        }
        const newProduct = await productManagerClass.addProduct(req.body)
        res.redirect(`/api/views/products/${newProduct.id}`)
        //res.status(200).json({ message: `New products created with id ${newProduct.id}`, products: newProduct })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.delete('/:idproduct', async (req, res) => {
    try {
        // console.log(req.params);
        const { idproduct } = req.params
        const productDeleted = await productManagerClass.deleteProduct(idproduct)

        if (productDeleted === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }

        return res.status(200).json({ message: `Product deleted with id ${idproduct}`, products: productDeleted })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put('/:idproduct', async (req, res) => {
    try {
        // console.log(req.params);
        const { idproduct } = req.params
        const obj = req.body
        const productUpdated = await productManagerClass.updateProduct(idproduct, obj)

        if (productUpdated.matchedCount === 0) {
            return res.status(400).json({ message: 'Product no found' })
        }

        return res.status(200).json({ message: `Product updated with id ${idproduct}`, products: productUpdated })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router