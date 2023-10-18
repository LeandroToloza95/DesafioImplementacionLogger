import {Schema, model} from 'mongoose';

//crear el esquema
const studentsSchema = new Schema({
    nombre:{
        type: 'string',
        required: true
    },
    apellido:{
        type: 'string',
        required: true
    },
    edad:{
        type: 'number',
        required: true
    },
    dni:{
        type: 'number',
        required: true,
        unique: true
    },
    curso:{type: 'string',
        required: true
    },
    nota:{type: 'number',
        required: true    
    }
});


//crear el modelo/coll
export const studentModel = model('Students',studentsSchema);