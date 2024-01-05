import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from "uuid"
//crear el esquema
const ticketSchema = new Schema({
    code:{
        type: 'string',
        default: uuidv4,
        required: true
    },
    purchase_datetime:{
        type: 'date',
        default: Date.now,
        required: true
    },
    products: {
        type: [
            {
                productId: {
                    type: 'string'
                },
                title: {
                    type: "string",
                },
                price: {
                    type: "number",
                },
                quantity: {
                    type: "number",
                },
                amount: {
                    type: "number",
                }
            }
        ],
        default: []
    },
    amount:{
        type: 'number',
        required: true
    },
    purchaser:{
        type: 'string',
        required: true
    }
});

export const ticketModel = model('Tickets',ticketSchema);