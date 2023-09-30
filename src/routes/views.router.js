import { Router } from "express";
import { userManagerClass } from "../UserManager.js";

const router = Router()

router.get('/vista1',(req,res) => {
    res.render('vista1')
})

router.get('/vista2',(req,res) => {
    res.render('vista2')
})

router.get('/signup',(req,res) => {
    res.render('signup',{style: 'signup.css'})
})

router.get('/signupresponse/:idUser',async(req,res) => {
    const {idUser} = req.params
    const user = await userManagerClass.getUsersbyID(+idUser)
    // console.log({...user});
    res.render('signupresponse',{user, style:'signup.css'})
})

router.get('/allusers',async(req,res) => {
    const user = await userManagerClass.getUsers();
    res.render('allUsers',{user, style:'list.css'})
})

router.get('/',(req,res) => {
    res.render('websocket',{style:'list.css'})
})

export default router