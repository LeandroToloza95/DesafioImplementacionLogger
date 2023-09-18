// const fs = require('fs');

import fs from 'fs';

class productManager{
    
    constructor(path) {
        this.path = path;
    }
    async addProduct(obj){

        try{
            const productos = await this.getProducts();
            let id;
            if(!productos.length){
                id = 1;
            }else{
                id = productos[productos.length-1].id+1
            };
            productos.push({id,...obj});
            await fs.promises.writeFile(this.path,JSON.stringify(productos))
            .then(()=>console.log(`Producto ${id} agregado con exito`))
            .catch(error=>console.log(error))

        }catch(error){
            return error
        }

    }

    async getProducts(){
        try{
            const existeArchivo = fs.existsSync(this.path)
            // console.log(existeArchivo);
    
            if(existeArchivo){
                const info = await fs.promises.readFile(this.path,'utf-8')
                return JSON.parse(info)
            }else{
                return []
            }       
        }catch (error){
            return error
        }
    }

    async getProductsbyID(idProducto){
        try{
            const productos = await this.getProducts();
            const producto = productos.find(u=>u.id === idProducto)
            if(producto){
                return producto
            }else{
                return 'producto no existe'
            }
        }
        catch(error){
            return error
        }
        
    }
    async deleteProduct(idProducto){
        try{
            const productos = await this.getProducts();
            const producto = productos.find(u=>u.id === idProducto)
            if(producto){
                const newArrayproductos = productos.filter(u=>u.id !== idProducto)

                await fs.promises.writeFile(this.path,JSON.stringify(newArrayproductos))
                .then(()=>console.log(`producto ${idProducto} eliminado con exito`))
                .catch(error=>console.log(error))
                
            }else{
                return console.log('producto no existe')
            }
        }
        catch(error){
            return error
        }
    }
    async updateProduct(idProducto,obj){
        try{
            const productos = await this.getProducts();
            const producto = productos.find(u=>u.id === idProducto)
            // console.log(producto)
            if (producto){
                let indice = await this.calculaIndice(productos,idProducto)
                console.log(indice)
                for(const property in obj){
                    productos[indice][`${property}`] = obj[`${property}`];
                    console.log(`Propiedad ${property} actualizada a: ${obj[`${property}`]}`);
                }
                await fs.promises.writeFile(this.path,JSON.stringify(productos))
                .then(()=>console.log(`Producto ${idProducto} actualizado con exito`))
                .catch(error=>console.log(error))

            }
            else{
                return 'producto no existe'
            }
        }
        catch(error){
            return error
        }
    }

    async calculaIndice (productos,idProducto) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                return i;
            }
        } 
    }

    
}

const product1 = {
    title: 'Procesador Intel Celeron G4900 3.10GHz Socket 1151 OEM Coffe Lake',
    description: 'Procesador',
    price: 16600,
    thumbnail: 'https://static-geektopia.com/storage/t/i/535/53506/9b3da83b7fb28625e02195fac.webp',
    code: 54,
    stock: 50
}

const product2 = {
    title: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler',
    description: 'Procesador',
    price: 16600,
    thumbnail: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_16752_Procesador_AMD_RYZEN_3_3200G_4.0GHz_Turbo___Radeon_Vega_8_AM4_Wraith_Stealth_Cooler_f414a507-grn.jpg',
    code: 55,
    stock: 30
}

const product3 = {
    title: 'Procesador Intel Celeron G5925 3.6GHz Socket 1200 Comet Lake',
    description: 'Procesador',
    price: 30600,
    thumbnail: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_27562_Procesador_Intel_Celeron_G5925_3.6GHz_Socket_1200_Comet_Lake_764c73ec-grn.jpg',
    code: 56,
    stock: 20
}

const product4 = {
    title: 'Procesador AMD RYZEN 5 3600 4.2GHz Turbo AM4 Wraith Stealth Cooler',
    description: 'Procesador',
    price: 114950,
    thumbnail: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_16749_Procesador_AMD_RYZEN_5_3600_4.2GHz_Turbo_AM4_Wraith_Stealth_Cooler_f8ab4915-grn.jpg',
    code: 57,
    stock: 56
}

const product1actulizado = {
    title: 'Procesador Intel Celeron G4900 3.10GHz Socket 1151 OEM Coffe Lake',
    description: 'Procesador',
    price: 26600,
    thumbnail: 'https://static-geektopia.com/storage/t/i/535/53506/9b3da83b7fb28625e02195fac.webp',
    code: 54,
    stock: 45
}




async function test(){
    const producto1 = new productManager('productos.json')
    await producto1.addProduct(product1)
    await producto1.addProduct(product2)
    await producto1.addProduct(product3)
    await producto1.addProduct(product4)

    
    // const producto1consulta = await producto1.getProducts()
    // console.log(producto1consulta)

    // console.log(await producto1.getProductsbyID(2))

    // await producto1.deleteProduct(3)

    // await producto1.updateProduct(1,product1actulizado)
}

// test()

export default productManager