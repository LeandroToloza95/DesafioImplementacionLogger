import { Router } from "express";
import { cartManagerClass } from "../dao/db/cartManagerDb.js";
import { productManagerClass } from "../dao/db/productManagerDb.js";
import { userManagerClass } from "../dao/db/userManagerDb.js";

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
    console.log(product);
    res.render('productById', { product: product, style: 'list.css' })
})

router.get('/products', async (req, res) => {

    const { email, first_name, last_name } = req.session
    const products = await productManagerClass.getProducts()
    const productsLean = products.payload.map(doc => doc.toObject({ getters: true, virtuals: true }))

    const data = { products: productsLean, 
        user: { email, first_name, last_name } }

    res.render('products', {data, style: 'list.css' })
})

router.get('/carts', async (req, res) => {
    try {
        const carts = await cartManagerClass.getCarts()
        //console.log(carts);
        //carts.map(doc => console.log(doc));
        //carts.map(doc => console.log(doc.toObject({ getters: true, virtuals: true })));
        //const cartsLean = carts.map(doc => doc.toObject({ getters: true, virtuals: true }))

        res.render('carts', { carts: carts, style: 'list.css' })
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
export default router