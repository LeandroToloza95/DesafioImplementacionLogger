import mongoose from 'mongoose';

//crear el esquema
const cartsSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products'
                },
                quantity: {
                    type: "number",
                    default: 0,
                }
            }
        ],
        default: [{}]
    }
});


//crear el modelo/coll
export const cartModel = mongoose.model('Carts', cartsSchema);