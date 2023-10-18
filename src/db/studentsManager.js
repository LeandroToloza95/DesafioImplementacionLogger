import { studentModel } from "./models/studentes.models.js";

class  StudentsManagerClass{

    async findAll(){
        const response = await studentModel.find()
        return response
    }

    async findById(id){
        const response = await studentModel.findById(id)
        return response
    }

    async createOne(obj){
        const response = await studentModel.create(obj)
        return response
    }

    async updateOne(id,obj){
        const response = await studentModel.updateOne({_id:id},{obj})
        return response
    }

    async deleteOne(id){
        const response = await studentModel.findByIdAndDelete({_id:id})
        return response
    }

}

export const StudentsManager = new StudentsManagerClass();