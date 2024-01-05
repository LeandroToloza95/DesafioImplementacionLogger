import mongoose from 'mongoose';
import config from '../config.js';

const URI = config.mongo_uri

if (config.persistence == "MONGO") {
    mongoose.connect(URI)
        .then(() => {
            console.log("Conectado a la base de datos")
        })
        .catch((err) => { console.log(err) })
}



