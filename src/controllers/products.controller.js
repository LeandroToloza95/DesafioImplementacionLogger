import {
    createOne as createNewProduct,
    findAll as findAllProducts,
    findById as findProduct,
    deleteOne as deleteProduct,
    updateOne as updateProduct
} from "../services/products.services.js"

export const createProduct = async (req, res) => {
    try {
        //validacion del body de campos obligatorios
        const { title, description, price, trademark, status, category, code, stock } = req.body

        if (!title || !description || !price || !trademark || !status || !category || !code || !stock) {
            return res.status(400).json({ message: 'Information sent is incompleted' })
        }
        const newProduct = await createNewProduct(req.body)
        res.redirect(`/api/views/products/${newProduct.id}`)
        //res.status(200).json({ message: `New products created with id ${newProduct.id}`, products: newProduct })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const findProducts = async (req, res) => {
    try {

        const { limit, sort, page } = req.query

        const productos = await findAllProducts(limit, sort, page)

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
}

export const findProductById = async (req, res) => {

    try {
        const { idproduct } = req.params
        const productos = await findProduct(idproduct)
        if (productos === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }
        return res.status(200).json({ message: `Products with id ${idproduct}`, products: productos })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const deleteProductById = async (req, res) => {
    try {
        const { idproduct } = req.params
        const productDeleted = await deleteProduct(idproduct)

        if (productDeleted === -1) {
            return res.status(400).json({ message: 'Product no found' })
        }

        return res.status(200).json({ message: `Product deleted with id ${idproduct}`, products: productDeleted })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateProductById = async (req, res) => {
    try {
        const { idproduct } = req.params
        const obj = req.body
        const productUpdated = await updateProduct(idproduct, obj)
        if (productUpdated=== -1) {
            return res.status(400).json({ message: 'Product no found' })
        }
        return res.status(200).json({ message: `Product updated with id ${idproduct}`, products: productUpdated })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}