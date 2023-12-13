import {
    createOne as createNewCart,
    findAll as findAllCarts,
    findById as findCart,
    findCartByUserId,
    deleteProductInCart,
    deleteProductsInCart,
    updateProductsInCart,
    addProductToCart
} from "../services/carts.services.js"

export const createCart = async (req, res) => {
    try {
        const newCart = await createNewCart()
        return res.status(200).json({ message: `New cart created with id ${newCart._id}`, cart: newCart })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const findCarts = async (req, res) => {
    try {
        const carrito = await findAllCarts()
        if (carrito === -1) {
            return res.status(400).json({ message: 'Carts no found' })
        }
        return res.status(200).json({ message: `Carts found`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const findCartById = async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await findCart(idCart)
        if (carrito === -1) {
            return res.status(400).json({ message: 'Cart no found' })
        }
        return res.status(200).json({ message: `Cart with id ${carrito._id}`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCartByUser = async (req, res) => {
    try {
        const { idUser } = req.params
        const carrito = await findCartByUserId(idUser)

        if (carrito === -1) {
            return res.status(400).json({ message: `Cart no found with id user: ${idUser}` })
        }
        return res.status(200).json({ message: `Cart with id ${carrito._id} from id user: ${idUser}`, cart: carrito })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProductByIdInCartById = async (req, res) => {
    try {
        const { idCart, idProduct } = req.params
        const response = await deleteProductInCart(idCart, idProduct)
        if (!response.message) {
            if (response.modifiedCount !== 0) {
                return res.status(200).json({ message: `Product ${idProduct} in Cart ${idCart} deleted` })
            }
                return res.status(400).json({ message: `Product ${idProduct} not found in Cart ${idCart}` })
        }
        return res.status(400).json({ message: response.message })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAllProductsInCartById = async (req, res) => {
    try {
        const { idCart } = req.params

        const response = await deleteProductsInCart(idCart)
        if (!response.message) {
            if (response.modifiedCount !== 0) {
                return res.status(200).json({ message: `Products in Cart ${carrito._id} deleted` })
            }
            return res.status(400).json({ message: 'Products no found in cart' })
        }
        return res.status(400).json({ message: response.message })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateProductInCartById = async (req, res) => {
    try {

        const { idCart } = req.params;
        const { idProduct } = req.params;
        const response = await addProductToCart(req)
        if (!response.message) {
            return res.status(200).json({ message: `Product with id: ${idProduct} loaded to cart with id: ${idCart} succesfully`, response: response})
        }
        return res.status(400).json({ message: response.message })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateAllProductInCartById = async (req, res) => {
    try {

        const { idCart } = req.params;
        const response = await updateProductsInCart(req)
        
        if (!response.message) {
            return res.status(200).json({ message: `Cart with id: ${idCart} succesfully Updated`, response: response })
            
        }
        return res.status(400).json({ message: response.message })
        
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}