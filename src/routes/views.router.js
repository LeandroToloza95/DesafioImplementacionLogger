import { Router } from "express";
import { cartManagerClass } from "../dao/db/cartManagerDb.js";
import {productManagerClass} from "../dao/db/productManagerDb.js";
import {userManagerClass} from "../dao/db/userManagerDb.js";

const router = Router()

router.get('/home',async (req,res) => {
    const products = await productManagerClass.getProducts();
    res.render('home',{products, style:'list.css'})
})

router.get('/realtimeproducts',async (req,res) => {

    const products = await productManagerClass.getProducts()
    console.log(products);
    res.render('realTimeProducts',{products, style:'signup.css'})

})

router.get('/addproduct',async (req,res) => {
    res.render('addProduct',{style:'list.css'})
})

router.get('/chat',(req,res) => {
    res.render('chat')
})

router.get('/signup',(req,res) => {
    res.render('signup',{style: 'signup.css'})
})

router.get('/signupresponse/:idUser',async(req,res) => {
    const {idUser} = req.params
    const user = await userManagerClass.getUsersbyID(idUser)
    // console.log({...user});
    res.render('signupresponse',{user: user, style:'signup.css'})
})

router.get('/productresponse/:idProduct',async(req,res) => {
    const {idProduct} = req.params
    const product = await productManagerClass.getProductsbyID(idProduct)
    console.log(product);
    res.render('productById',{product:product, style:'list.css'})
})

router.get('/allproducts',async(req,res) => {
    const products = await productManagerClass.getProducts()
    res.render('allproducts',{products:products, style:'list.css'})
})

router.get('/allusers',async(req,res) => {
    const user = await userManagerClass.getUsers()
   
    console.log(user);
    res.render('allUsers',{user, style:'list.css'})
})

router.get('/',(req,res) => {
    res.render('websocket',{style:'list.css'})
})

export default router