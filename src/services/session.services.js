import { userManagerClass } from '../dao/factory.js'
import { cartManagerClass } from '../dao/factory.js'
import { compareData, generateToken, hashData } from "../utils.js";

class SessionService {
    login = async (email, password) => {
        const userDB = await userManagerClass.getUsersbyMail(email)
        if (userDB === -1) {
            return { "status": "failed", "message": `User with email ${email} not found` }
        }
        const comparePassword = await compareData(password, userDB.password)
        if (!comparePassword) {
            return { "status": "failed", "message": 'Password is wrong' }
        }
        const token = generateToken({
            email,
            first_name: userDB.first_name,
            id: userDB._id,
            role: userDB.role
        })
        return { "status": "success", "message": 'ok', token, userDB }

    }

    signup = async (obj) => {
        const cart = await cartManagerClass.createCart()
        const newUser = await userManagerClass.addUser({ ...obj, cart: cart.id })
        return newUser
    }
}

export const sessionService= new SessionService()