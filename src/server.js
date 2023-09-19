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
    
            return res.json({message: 'products', products : productosArray})
        }

        res.json({message: 'All products', products : productos})
      }
      
    main();
    
})

app.get('/products/:idproduct',(req,res)=>{
    async function main() {

        console.log(req.params);

        const  productos = await getTotalProducts()

        const {idproduct}= req.params

        if (idproduct){
            const producto = 
                isNumber(+idproduct) ? productos.find(u => u.id === +idproduct )
                : bproductos
            console.log(+isNumber(idproduct));
            return res.json({message: 'All products', products : producto})
        }

        res.json({message: 'All products', products : productos})

    }
        
    main();
})

app.listen(8080,() => console.log("Servidor 8080 escuchando"))