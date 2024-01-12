import { productService } from '../services/products.services.js'
import {generateProducts} from '../faker.js'
import CustomError from "../error/not-found.error.js";
import {ErrorMessages} from  "../error/error.enum.js"
class ProductsController {
    createProduct = async (req, res) => {
        try {
            //validacion del body de campos obligatorios
            
            const { title, description, price, trademark, status, category, code, stock } = req.body

            if (!title){
                CustomError.createError(ErrorMessages.TITTLE_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }
            if (!description){
                CustomError.createError(ErrorMessages.DESCRIPTION_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }
            if (!price){
                CustomError.createError(ErrorMessages.PRICE_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }            
            if (!trademark){
                CustomError.createError(ErrorMessages.TRADEMARK_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            } 
            if (!status){
                CustomError.createError(ErrorMessages.STATUS_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }   
            if (!category){
                CustomError.createError(ErrorMessages.CATEGORY_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }   
            if (!code){
                CustomError.createError(ErrorMessages.CODE_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            } 
            if (!stock){
                CustomError.createError(ErrorMessages.STATUS_NOT_INTRODUCED)
                return res.status(400).json({ message: 'Information sent is incompleted' })
            } 
            
            const newProduct = await productService.createOne(req.body)
            const responseMessage = { success: true, message: `New products created with id ${newProduct.id}` , products: newProduct};
            res.redirect(302,`/api/views/products/${newProduct.id}`)
            //return res.status(200).json(responseMessage)

        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }

    findProducts = async (req, res) => {
        try {

            const { limit, sort, page } = req.query

            const productos = await productService.findAll(limit, sort, page)

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

    findProductById = async (req, res) => {

        try {
            const { idproduct } = req.params
            const productos = await productService.findById(idproduct)
            if (productos === -1) {
                return res.status(400).json({ message: 'Product no found' })
            }
            return res.status(200).json({ message: `Products with id ${idproduct}`, products: productos })

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }

    deleteProductById = async (req, res) => {
        try {
            const { idproduct } = req.params
            const productDeleted = await productService.deleteOne(idproduct)

            if (productDeleted === -1) {
                return res.status(400).json({ message: 'Product no found' })
            }

            return res.status(200).json({ message: `Product deleted with id ${idproduct}`, products: productDeleted })

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    updateProductById = async (req, res) => {
        try {
            const { idproduct } = req.params
            const obj = req.body
            
            const productUpdated = await productService.updateOne(idproduct, obj)

            if (productUpdated === -1) {
                return res.status(400).json({ message: 'Product no found' })
            }
            return res.status(200).json({ message: `Product updated with id ${idproduct}`, products: productUpdated })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createProductMoking= async (req, res) => {
        try {
            //validacion del body de campos obligatorios
            let createdProducts =[]
            for(let i=0;i<5;i++) {
                const product = generateProducts()
                const { title, description, price, trademark, status, category, code, stock } = product
                if (!title) {
                    CustomError.createError(ErrorMessages.USER_NOT_FOUND)
                    return res.status(400).json({ message: 'Information sent is incompleted' })
                }
                
                if (!title || !description || !price || !trademark || !status || !category || !code || !stock) {
                    return res.status(400).json({ message: 'Information sent is incompleted' })
                }
                
                const newProduct = await productService.createOne(product)
                createdProducts.push(newProduct)
                
            }
            const responseMessage = { products: createdProducts};
            //res.redirect(302,`/api/views/products/${newProduct.id}`)
            return res.status(200).json(responseMessage)

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const productController = new ProductsController();