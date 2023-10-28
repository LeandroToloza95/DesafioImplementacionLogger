import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import {Server} from 'socket.io';
import "./dao/config.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


//routes
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartRouter)

//render handlebars
app.use('/api',viewsRouter)

const httpServer = app.listen(8080, () => console.log("Servidor 8080 escuchando"))

//Websocket - desde lado servidor
const socketServer = new Server(httpServer);

//connection - disconnect
const names = [];
const messages = [];
socketServer.on('connection',(socket)=>{
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on("disconnect",()=>{
        console.log(`Cliente desconectado: ${socket.id}`)
    })

    socket.on('firstEvent',(info)=>{
        names.push(info)
        console.log(`Array: ${names}`);
        socket.emit('secondEvent',names)
        socketServer.emit('secondEvent',names)
        socketServer.broadcast.emit('secondEvent',names)
        socketServer.emit('secondEvent',info)
    })
    }
    
);

socketServer.on('connection',(socket)=>{
    socket.on('newProduct',(user)=>{
        socket.broadcast.emit('newUserBroadcast',user)
    });

    socket.on('message',(info)=>{
        messages.push(info)
        socketServer.emit('chat',messages)
    })
})

