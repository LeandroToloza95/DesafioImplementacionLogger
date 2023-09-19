import express from 'express';
import productManager from './productManager.js'

const app = express();

async function getTotalProducts(){
    const productosArchivo = new productManager('productos.json')
    const response = await productosArchivo.getProducts()
    return response
}

function isNumber(val){
    return typeof val==='number';
}

app.get('/products',(req, res) =>{
    async function main() {
        console.log('query',req.query);
        const {limit} = req.query

        const  productos = await getTotalProducts()
  
        if(limit){
            const productosArray = 
                isNumber(+limit) ? productos.slice(0,limit) 
                : productos          
    
            return res.json({message: 'products',products:productosArray})
        }

        res.json({message: 'All products',productos})
      }
      
    main();
    
})

app.get('/users/:idUser',(req,res)=>{
    const {idUser}= req.params
    const user = users.find(u => u.id === +idUser )
    console.log(req.params);
    res.json({message: 'User',user})
})

app.listen(8080,() => console.log("Servidor 8080 escuchando"))