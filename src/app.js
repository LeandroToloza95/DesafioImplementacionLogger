import express from 'express';
import productManager from './productManager.js'

const app = express();



app.get('/products',(req, res) =>{
    console.log('query',req.query);
    const {limit} = req.query
    // if(name){
    //     const user = users.filter(u => u.name === name)
    //     return res.json({message: 'user',user})
    // }
    const productosArchivo = new productManager('productos.json')

    const productos = async function test(){
        const productos1 = await productosArchivo.getProducts()
        return productos1
    }
    const prueba = productos();
    console.log(prueba);

    if(limit){
        const productosArray = 
            isNumber(+limit) ? productos.slice(0,limit) 
            : productos          

        return res.json({message: 'products',products:productosArray})
    }
    // console.log(req);
    //params - query - ody
    res.json({message: 'All products',productos})
})

app.get('/users/:idUser',(req,res)=>{
    const {idUser}= req.params
    const user = users.find(u => u.id === +idUser )
    console.log(req.params);
    res.json({message: 'User',user})
})

app.listen(8080,() => console.log("Servidor 8080 escuchando"))