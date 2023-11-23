import {Schema, model} from 'mongoose';

//crear el esquema
const userSchema = new Schema({
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
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    from_github:{
        type: 'boolean',
        default: false
    },
    role:{
        type: 'string',
        enum: ['admin', 'premiun','client'],
        default: 'client'
    },
    isAdmin:{
        type: 'string',
        required: true
    }
});


//crear el modelo/coll
export const userModel = model('Users',userSchema);