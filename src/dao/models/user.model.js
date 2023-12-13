import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    age:{
        type: 'number'
    },
    password:{
        type: 'string',
        required: true
    },
    from_github:{
        type: 'boolean',
        default: false
    },
    from_google:{
        type: 'boolean',
        default: false
    },
    role:{
        type: 'string',
        enum: ['admin', 'premium','user'],
        default: 'user'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Carts',
    }
});

userSchema.plugin(mongoosePaginate)
//crear el modelo/coll
export const userModel = model('Users',userSchema);