// import { populate } from "moongose/models/user_model.js";
import  {userModel}  from "../models/user.model.js";

class  UsersManagerClass{

    async getUsers(queryObj = null){
            try{
            const { order } = (queryObj ?? {})
            const { limit } = (queryObj ?? {})
            let orderId
            switch (order) {
                case 'ASC':
                    orderId = 1
                    break;
                case 'DESC':
                    orderId = -1
                    break;
                default:
                    orderId = null
            }

            const consulta = userModel.find().populate('cart').lean()

            if(orderId){
                consulta.sort({ last_name : orderId })
            }
            if(limit){
                consulta.limit(limit)
            }    

            const response = await consulta
            return response
        }
        catch(error){
            throw new Error(error);
        }
    }

    async getUsersbyID(id){
        try{
            const user = await userModel.findById(id).lean()    

            if (!user) {
                const response = -1
                return response
            }

            const response = user
            return response
        }
        catch(error){
            throw new Error(error);
        }
    }

    async getUsersbyMail(email){
        try{
            const user = await userModel.findOne({email}).populate('cart').lean()    

            if (!user) {
                const response = -1
                return response
            }

            const response = user
            return response
        }
        catch(error){
            throw new Error(error);
        }
    }

    async addUser(obj){
        try{
            const response = await userModel.create(obj)
            return response
        }
        catch(error){
            throw new Error(error);
        }
    }

    async updateUser(id,obj){
        try{
              
            const user = await userModel.findByIdAndUpdate({_id:id},{$set:obj})
            if (!user) {
                const response = -1
                return response
            }

            const response = user
            return response
        }
        catch(error){
            throw new Error(error);
        }
    }

    async deleteUser(id){
        try{
            const user = await userModel.findByIdAndDelete({_id:id})
            if (!user) {
                const response = -1
                return response
            }
            const response = user

            return response
        }
        catch(error){
            throw new Error(error);
        }
    }
}

export const userManagerClass = new UsersManagerClass();