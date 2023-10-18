import {Schema, model} from 'mongoose';

//crear el esquema
const userSchema = new Schema({
    id:{
        type: 'string',
        required: true
    },
    first_name:{
        type: 'string',
        required: true
    },
    last_name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'number',
        required: true
    },
    isAdmin:{
        type: 'string',
        required: true
    }
});


//crear el modelo/coll
export const userModel = model('Users',userSchema);