import {Schema, model} from 'mongoose';

//crear el esquema
const cartsSchema = new Schema({
    id:{
        type: 'string',
        required: true
    },
    products:{
        type: 'array',
    }
});


//crear el modelo/coll
export const cartModel = model('Carts',cartsSchema);