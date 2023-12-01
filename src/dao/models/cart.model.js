import mongoose from 'mongoose';

//crear el esquema
const cartsSchema = new mongoose.Schema({
    // user:  {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Users',
    //     required: true
    // }
    // ,
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products'
                },
                quantity: {
                    type: "number",
                    
                }
            }
        ],
        default: []
    }
});


//crear el modelo/coll
export const cartModel = mongoose.model('Carts', cartsSchema);