import {
    findAll as findAllUsers,
    findById as findUser,
    deleteOne as deleteUser
} from "../services/users.services.js"

export const findUsers = async (req, res) => {
    try {

        const { limit, sort, page } = req.query
        const usuarios = await findAllUsers(limit, sort, page)

        if (!usuarios) {
            return res.status(400).json({ message: 'No users found' })
        }

        return res.status(200).json({ message: `users found ` + usuarios.mensajeLimite + " " + usuarios.mensajeOrden, "users": usuarios.payload, "info": usuarios.info})
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const findUserById = async (req, res) => {
    try {
        const { iduser } = req.params
        const usuario = await findUser(iduser)
        if (usuario === -1) {
            return res.status(400).json({ message: 'User no found' })
        }
        return res.status(200).json({ message: `users with id ${iduser}`, users: usuario })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const deleteUserById = async (req, res) => {
    try {
        const { iduser } = req.params
        const UserDeleted = await deleteOne(iduser)
        if (UserDeleted === -1) {
            return res.status(400).json({ message: 'User no found' })
        }
        return res.status(200).json({ message: `User deleted with id ${UserDeleted._id}`, users: UserDeleted })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateUserById = async (req, res) => {
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
}