import { Router } from "express";
import { userManagerClass } from '../dao/db/userManagerDb.js'
import { compareData, hashData } from "../utils.js";
import passport from "passport";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

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

// router.get('/:iduser', jwtValidation, authMiddleware(['admin','premium']), async (req, res) => {
//     try {
//         const { iduser } = req.params
//         const usuarios = await userManagerClass.getUsersbyID(iduser)
//         if (usuarios === -1) {
//             return res.status(400).json({ message: 'User no found' })
//         }
//         return res.status(200).json({ message: `users with id ${iduser}`, users: usuarios })

//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message })
//     }

// })

//passport jwt


router.get('/:iduser', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log(req.user);
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