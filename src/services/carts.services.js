import { cartManagerClass } from '../dao/db/cartManagerDb.js'
import { findById as findUser } from "./users.services.js"
import { findById as findProduct } from "./products.services.js"

export const createOne = async () => {
    const createdCart = await cartManagerClass.createCart()
    return createdCart
}
   
export const findAll = async () => {
    const carts = await cartManagerClass.getCarts()
    return carts
}

export const findById = async (idCart) => {
    const cart = await cartManagerClass.getCartsbyID(idCart)
    return cart
}

export const deleteProductInCart = async (idCart, idProduct) => {
    const carrito = await findById(idCart)
    if (carrito === -1) {
        return { message: 'Cart no found' }
    }

    const product = await findProduct(idProduct)
    if (product === -1) {
        return { message: 'Product no found' }
    }

    const cart = await cartManagerClass.deleteProductInCart(idCart, idProduct)
    return cart
}

export const deleteProductsInCart = async (idCart) => {

    const carrito = await findById(idCart)
    if (carrito === -1) {
        return { message: 'Cart no found' }
    }
    const response = await cartManagerClass.deleteProductsInCart(idCart)
    return response
}

export const addProductToCart = async (obj) => {
    const { idCart } = obj.params
    const { idProduct } = obj.params
    const { quantity } = obj.body || 1

    const producto = await findProduct(idProduct);
    if (producto === -1) {
        return { message: 'product no found' }
    }

    const cart = await findById(idCart)
    if (cart === -1) {
        return { message: 'Cart no found' }
    }
    const object = {
        "product": idProduct,
        "quantity": quantity || 1
    }

    const productsInCartToAdd = cart.products
    const productToAdd = productsInCartToAdd.find(u => u.product.id == idProduct) ?? null

    if (productToAdd === null) {
        const response = await cartManagerClass.addNewProductToCart(idCart, object)
        return response

    } else {
        const response = await cartManagerClass.modifyExistentProductToCart(idCart, idProduct, object)
        return response
    }

}

export const updateProductsInCart = async (obj) => {

    const { idCart } = obj.params
    const products = obj.body || null

    const cart = await findById(idCart)
    if (cart === -1) {
        return { message: 'Cart no found' }
    }

    if (!products) {
        return { message: "products not found" }
    }
    const response = []
    for (let product of products) {
        console.log(product);
        let idProduct = product.product
        let quantity = product.quantity

        //valido que exista el producto en la base de productos
        let productValidate = await findProduct(idProduct)

        if (productValidate !== -1 && quantity) {
            let object = {
                "product": idProduct,
                "quantity": quantity
            }
            let productsInCartToAdd = cart.products
            let productToAdd = productsInCartToAdd.find(u => u.product == idProduct) ?? null

            if (productToAdd === null) {
                const responseAux = await cartManagerClass.addNewProductToCart(idCart, object)
                response.push({product: idProduct,detail: responseAux})
            } else {
                const responseAux = await cartManagerClass.modifyExistentProductToCart(idCart, idProduct, object)
                response.push({product: idProduct,detail: responseAux})
            }
        } else {
            response.push({ product: idProduct, detail: `product with id ${idProduct} invalid` })
        }

    }
    console.log(response);
    return response
}

export const findCartByUserId = async (idUser) => {
    const user = await findUser(idUser)
    if (user === -1) {
        return -1
    }

    const carrito = await findById(user.cart._id.toString())
    if (!carrito) {
        return -1
    }
    return carrito
}

