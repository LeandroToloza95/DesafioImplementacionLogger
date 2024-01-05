import { Router } from "express";
import {cartService} from "../services/carts.services.js"
import { userService } from "../services/users.services.js";
import { productService } from "../services/products.services.js";

const router = Router()

router.get('/home', async (req, res) => {
    const products = await productManagerClass.getProducts();
    res.render('home', { products, style: 'list.css' })
})

router.get('/realtimeproducts', async (req, res) => {

    const products = await productManagerClass.getProducts()
    console.log(products);
    res.render('realTimeProducts', { products, style: 'signup.css' })

})

router.get('/addproduct', async (req, res) => {
    res.render('addProduct', { style: 'list.css' })
})

router.get('/chat', (req, res) => {
    res.render('chat')
})

router.get('/signupresponse/:idUser', async (req, res) => {
    const { idUser } = req.params
    const user = await userManagerClass.getUsersbyID(idUser)
    // console.log({...user});
    res.render('signupresponse', { user: user, style: 'signup.css' })
})

router.get('/products/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    const product = await productManagerClass.getProductsbyID(idProduct)
    res.render('productById', { product: product, style: 'list.css' })
})

router.get('/products', async (req, res) => {
    const { userId } = req.session
    const products = await productService.findAll()
    const user = await userService.findById(userId)
    const productsLean = products.payload.map(doc => doc.toObject({ getters: true, virtuals: true }))
    const data = { products: productsLean, 
        user: user }

    res.render('products', {data, style: 'list.css' })
})

router.get('/editProducts', async (req, res) => {
    const { email, first_name, last_name } = req.session
    
    const products = await productManagerClass.getProducts()
    const productsLean = products.docs.map(doc => doc.toObject({ getters: true, virtuals: true }))

    const data = { products: productsLean, 
        user: { email, first_name, last_name } }

    res.render('editProducts', {data, style: 'list.css' })
})

router.get('/carts/:cartId', async (req, res) => {
    try {
        const {cartId} = req.params
        const user = await userService.findBycartId(cartId)
        const cart = await cartService.findById(cartId)
        const products = cart.products.map(product => product.toObject({ getters: true, virtuals: true }))
        const productsWithAmount = products.map((producto) => {
            const monto = producto.quantity * producto.product.price;
            return { ...producto, monto }; // Copiar las propiedades existentes y agregar "monto"
          });
        res.render('cartById', {cart:cartId,user, products: productsWithAmount, style: 'list.css' })
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/allusers', async (req, res) => {
    const user = await userManagerClass.getUsers()

    console.log(user);
    res.render('allUsers', { user, style: 'list.css' })
})

router.get('/', (req, res) => {
    res.render('websocket', { style: 'list.css' })
})

router.get('/login', (req, res) => {
    res.render('login', { style: 'list.css' })
})

router.get('/signup', (req, res) => {
    res.render('signup', { style: 'list.css' })
})

router.get('/error', (req, res) => {
    res.render('error', { style: 'list.css' })
})

export default router