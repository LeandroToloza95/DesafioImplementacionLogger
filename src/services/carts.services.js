import { cartManagerClass } from '../dao/factory.js'
import { userService } from './users.services.js'
import { productService } from './products.services.js'

class CartsService {
    createOne = async () => {
        const createdCart = await cartManagerClass.createCart()
        return createdCart
    }

    findAll = async () => {
        const carts = await cartManagerClass.getCarts()
        return carts
    }

    findById = async (idCart) => {
        const cart = await cartManagerClass.getCartsbyID(idCart)
        return cart
    }

    deleteProductInCart = async (idCart, idProduct) => {
        const carrito = await this.findById(idCart)
        if (carrito === -1) {
            return { message: 'Cart no found' }
        }

        const product = await productService.findById(idProduct)
        if (product === -1) {
            return { message: 'Product no found' }
        }

        const cart = await cartManagerClass.deleteProductInCart(idCart, idProduct)
        return cart
    }

    deleteProductsInCart = async (idCart) => {

        const carrito = await this.findById(idCart)
        if (carrito === -1) {
            return { message: 'Cart no found' }
        }
        const response = await cartManagerClass.deleteProductsInCart(idCart)
        return response
    }

    addProductToCart = async (obj) => {
        const { idCart } = obj.params
        const { idProduct } = obj.params
        const { quantity } = obj.body || 1

        const producto = await productService.findById(idProduct);

        if (producto === -1) {
            return { message: 'product no found' }
        }

        const cart = await this.findById(idCart)
        if (cart === -1) {
            return { message: 'Cart no found' }
        }
        const object = {
            "product": idProduct,
            "quantity": quantity || 1
        }

        const productsInCartToAdd = cart.products

        const productToAdd = productsInCartToAdd.find(u => u.product._id == idProduct) ?? null

        if (productToAdd === null) {
            const response = await cartManagerClass.addNewProductToCart(idCart, object)
            return response

        } else {
            const response = await cartManagerClass.modifyExistentProductToCart(idCart, idProduct, object)
            return response
        }

    }

    updateProductsInCart = async (obj) => {

        const { idCart } = obj.params
        const products = obj.body || null



        if (!products) {
            return { message: "products not found" }
        }
        const response = []
        for (let product of products) {
            const cart = await this.findById(idCart)

            if (cart === -1) {
                return { message: 'Cart no found' }
            }
            let idProduct = product.product
            let quantity = product.quantity

            //valido que exista el producto en la base de productos
            let productValidate = await productService.findById(idProduct)

            if (productValidate !== -1 && quantity) {
                let object = {
                    "product": idProduct,
                    "quantity": quantity
                }
                let productsInCartToAdd = cart.products
                let productToAdd = productsInCartToAdd.find(u => u.product.id == product.product) ?? null
                if (productToAdd === null) {
                    const responseAux = await cartManagerClass.addNewProductToCart(idCart, object)
                    response.push({ product: idProduct, detail: responseAux })
                } else {
                    const responseAux = await cartManagerClass.modifyExistentProductToCart(idCart, idProduct, object)
                    response.push({ product: idProduct, detail: responseAux })
                }
            } else {
                response.push({ product: idProduct, detail: `product with id ${idProduct} invalid` })
            }

        }
        return response
    }

    findCartByUserId = async (idUser) => {
        const user = await userService.findById(idUser)
        if (user === -1) {
            return -1
        }

        const carrito = await this.findById(user.cart._id.toString())
        if (!carrito) {
            return -1
        }
        return carrito
    }

}

export const cartService = new CartsService();