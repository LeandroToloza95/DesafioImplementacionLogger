//import { populate } from "moongose/models/user_model.js";
import { userModel } from "../models/user.model.js";

class UsersManagerClass {

    async getUsers(limit, order, page) {
        try {
            const result = await userModel.paginate({}, { limit: limit, page: page, sort: { last_name: order }, populate: 'cart' })
            return result
        }
        catch (error) {
            throw new Error(error);
        }

    }

    async getUsersbyID(id) {
        try {
            const user = await userModel.findById(id).populate('cart').lean()
            if (!user) {
                const response = -1
                return response
            }
            return user
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async getUsersbyMail(email) {
        try {
            const user = await userModel.findOne({ email }).populate('cart').lean()

            if (!user) {
                const response = -1
                return response
            }

            const response = user
            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async addUser(obj) {
        try {
            const response = await userModel.create(obj)
            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(id, obj) {
        try {

            const user = await userModel.findByIdAndUpdate({ _id: id }, { $set: obj })
            if (!user) {
                const response = -1
                return response
            }

            const response = user
            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete({ _id: id })
            if (!user) {
                const response = -1
                return response
            }
            const response = user

            return response
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

export const userManagerClass = new UsersManagerClass();