import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//routes
app.use('/api/products',productsRouter)
app.use('/api/users',usersRouter)
app.use('/api/carts',cartRouter)

app.listen(8080, () => console.log("Servidor 8080 escuchando"))