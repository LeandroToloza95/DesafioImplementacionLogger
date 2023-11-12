import { Router } from "express";
import { userManagerClass } from '../dao/db/userManagerDb.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { compareData, hashData } from "../utils.js";
import passport from "passport";

const router = Router();

router.get('/', async (req, res) => {
    try {

        const { limit } = req.query
        const { order } = req.query
        const usuarios = await userManagerClass.getUsers(req.query)

        if (!usuarios.length) {
            return res.status(200).json({ message: 'No users found' })
        }

        let mensajeLimite = 'without limit'
        if (limit && +limit > 0) {
            mensajeLimite = `limited to ${limit} elements`
        }

        let mensajeOrden = 'without order'
        if (order && (order == 'DESC' || order == 'ASC')) {
            mensajeOrden = `ordered to ${order}`
        }

        return res.status(200).json({ message: `users found ` + mensajeLimite + " " + mensajeOrden, "users": usuarios })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/:iduser', async (req, res) => {
    try {
        const { iduser } = req.params
        const usuarios = await userManagerClass.getUsersbyID(iduser)
        if (usuarios === -1) {
            return res.status(400).json({ message: 'User no found' })
        }
        return res.status(200).json({ message: `users with id ${iduser}`, users: usuarios })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

})

////Signup - Login - sin passport
// router.post('/login', async (req, res) => {
//     //validacion del body de campos obligatorios
//     try {
//         const { email, password} = req.body

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Information sent is incompleted' })
//         }

//         const userDB = await userManagerClass.getUsersbyMail(email)
//         if (userDB === -1) {
//             return res.status(401).json({ message: `User with email ${email} not found` })
//         }

//         const comparePassword = await compareData(password,userDB.password)
//         if(!comparePassword){
//             return res.status(401).json({ message: 'Password is wrong'})
//         }

//         req.session["email"] = userDB.email;
//         req.session["first_name"] = userDB.first_name;
//         req.session["last_name"] = userDB.last_name;

//         req.session["isAdmin"] = email === 'adminCoder@coder.com' && password === 'adminCod3r123' ? true : false
//         res.status(200)//.json({ message:`Welcome ${userDB.first_name}`})
//         res.redirect(`/api/views/products`)
//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })

// router.post('/signup', async (req, res) => {
//     //validacion del body de campos obligatorios
//     try {
//         const { first_name, last_name, email, password, isAdmin } = req.body

//         const hashedPassword = await hashData(password)
//         //FS
//         //req.session["email"] = email

//         if (!first_name || !last_name || !email || !password || !isAdmin) {
//             return res.status(400).json({ message: 'Information sent is incompleted' })
//         }

//         const newUser = await userManagerClass.addUser({...req.body, password: hashedPassword})
//         //En vez de enviar la anterior linea envio una ventana mas personalizada
//         res.status(200)//.json({ message: `New users created with id ${newUser.id}`, users: newUser })
//         res.redirect(`/api/views/signupresponse/${newUser.id}`)
//         //return res.status(200).json({ message: `New users created with id ${newUser.id}`, users: newUser })
//         //res.user=newUser
//     }
//     catch (error) {
//         console.log( error.message);
//         return res.status(500).json({ message: error.message })
//     }

// })

//Signup - Login - Passport
router.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.redirect(`/api/views/signupresponse/${req.user.id}`)
})

router.post('/login', passport.authenticate('login',
    {
        successRedirect: `/api/views/products`,
        failureRedirect: `/api/views/error`
    }))

// Signup - Login - Passport GITHUB
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github',
    passport.authenticate('github',
        {
            failureRedirect: '/error',
            successRedirect: '/home'
        }),
);


router.get('/session/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect(`/api/views/login`)
    })

})

router.delete('/:iduser', authMiddleware, async (req, res) => {
    try {
        // console.log(req.params);
        const { iduser } = req.params
        const UserDeleted = await userManagerClass.deleteUser(iduser)

        if (UserDeleted === -1) {
            return res.status(400).json({ message: 'User no found' })
        }

        return res.status(200).json({ message: `User deleted with id ${UserDeleted._id}`, users: UserDeleted })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put('/:iduser', authMiddleware, async (req, res) => {
    try {
        // console.log(req.params);
        const { iduser } = req.params
        const obj = req.body
        const UserUpdated = await userManagerClass.updateUser(iduser, obj)
        if (UserUpdated === -1) {
            return res.status(400).json({ message: 'User no found' })
        }

        return res.status(200).json({ message: `User updated with id ${iduser}`, users: UserUpdated })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router