import {Schema, model} from 'mongoose';

//crear el esquema
const cartsSchema = new Schema({

    products:{
        type:[
            {
                idProduct:{
                    type: 'string',
                },
                quantity:{
                    type: 'number',
                }
            }
        ],
        default:[{}]
    }
});


//crear el modelo/coll
export const cartModel = model('Carts',cartsSchema);