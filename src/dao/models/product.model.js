import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//crear el esquema
const productSchema = new Schema({
    title:{
        type: 'string',
        required: true
    },
    trademark:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    },
    price:{
        type: 'number',
        required: true
    },
    status:{
        type: 'boolean',
        required: true
    },
    category:{
        type: 'string',
        required: true
    },
    thumbnail:{
        type: 'array'
    },
    code:{
        type: 'number',
        required: true
    },
    stock:{
        type: 'number',
        required: true
    }
});

productSchema.plugin(mongoosePaginate)
//crear el modelo/coll
export const productModel = model('Products',productSchema);