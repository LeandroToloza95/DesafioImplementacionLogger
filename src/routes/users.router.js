import { Router } from "express";
import { userManagerClass } from '../dao/db/userManagerDb.js'
import { compareData, hashData } from "../utils.js";
import passport from "passport";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    findUsers,
    findUserById,
    deleteUserById,
    updateUserById
}from "../controllers/users.controller.js"

const router = Router();

router.get('/', findUsers )
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

//router.get('/:iduser',passport.authenticate('jwt', { session: false }), findUserById )
router.get('/:iduser', findUserById )
router.delete('/:iduser', authMiddleware, deleteUserById )
router.put('/:iduser', authMiddleware,updateUserById )

export default router