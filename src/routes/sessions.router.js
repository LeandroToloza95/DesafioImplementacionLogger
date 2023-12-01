import { Router } from "express";
import passport from "passport";
import { compareData, generateToken, hashData } from "../utils.js";
import { userManagerClass } from '../dao/db/userManagerDb.js'
import { cartManagerClass } from '../dao/db/cartManagerDb.js'

const router = Router();

//Signup - Login - sin passport
router.post('/login', async (req, res) => {
    //validacion del body de campos obligatorios
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Information sent is incompleted' })
        }

        const userDB = await userManagerClass.getUsersbyMail(email)
        if (userDB === -1) {
            return res.status(401).json({ message: `User with email ${email} not found` })
        }

        const comparePassword = await compareData(password, userDB.password)
        if (!comparePassword) {
            return res.status(401).json({ message: 'Password is wrong' })
        }

        req.session["email"] = userDB.email;
        req.session["first_name"] = userDB.first_name;
        req.session["last_name"] = userDB.last_name;

        req.session["isAdmin"] = email === 'adminCoder@coder.com' && password === 'adminCod3r123' ? true : false

        const token = generateToken({
            email,
            first_name: userDB.first_name,
            rol: userDB.role
        })

        //httpOnly : true -> no permite sacar desde el front la cookie
        res
            .status(200)
            .cookie("token", token, { httpOnly: true })
            .json({ message: `Welcome ${userDB.first_name}`, token })
        //res.redirect(`/api/views/products`)

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post('/signup', async (req, res) => {
    //validacion del body de campos obligatorios
    try {
        const { first_name, last_name, email, password, age, role } = req.body

        const hashedPassword = await hashData(password)
        //FS
        //req.session["email"] = email

        if (!first_name || !last_name || !email || !password|| !age) {
            return res.status(400).json({ message: 'Information sent is incompleted' })
        }
        const cart = await cartManagerClass.createCart()
        const newUser = await userManagerClass.addUser({ ...req.body, password: hashedPassword, cart: cart.id })
        //En vez de enviar la anterior linea envio una ventana mas personalizada
        res.status(200)//.json({ message: `New users created with id ${newUser.id}`, users: newUser })
        res.redirect(`/api/views/signupresponse/${newUser.id}`)
        //return res.status(200).json({ message: `New users created with id ${newUser.id}`, users: newUser })
        //res.user=newUser
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message })
    }

})

//Signup - Login - Passport
// router.post('/signup', passport.authenticate('signup'), (req, res) => {
//     res.redirect(`/api/views/signupresponse/${req.user.id}`)
// })

// router.post('/login', passport.authenticate('login',
//     {
//         successRedirect: `/api/views/products`,
//         failureRedirect: `/api/views/error`
//     }))

// Signup - Login - Passport GITHUB
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github',
    passport.authenticate('github',
        {
            failureRedirect: '/error',
            successRedirect: '/api/views/products'
        }), (req, res) => {
            req.session.user = req.user;
            res.redirect('/api/views/products')
        }
);


router.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect(`/api/views/login`)
    })

})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/views/signup' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`/api/views/signupresponse/${req.user.id}`);
  });
export default router