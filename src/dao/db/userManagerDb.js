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

            const consulta = userModel.find()

            if(orderId){
                consulta.sort({ last_name : orderId })
            }
            if(limit){
                consulta.limit(limit)
            }    

            const response = await consulta.lean()
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