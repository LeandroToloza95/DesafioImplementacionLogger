import mongoose from 'mongoose';

const URI = 'mongodb+srv://mleandrot1995:Greenday23@cluster0.lwrgoh0.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(() => {
    console.log("Conectado a la base de datos")
})
.catch((err) => {console.log(err)})

