import { log } from 'console';
import fs from 'fs';
import { productManagerClass } from './productManager.js'

class cartManager {

    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            const carts = await this.getCarts();
            let id;
            if (!carts.length) {
                id = 1;
            } else {
                id = carts[carts.length - 1].idCart + 1
            };
            
            const products = []
            const newCart = { idCart:id , products:products }
            carts.push(newCart);
            
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
                .then(() => console.log(`Carrito ${id} agregado con exito`))
                .catch(error => console.log(error))

            return newCart

        } catch (error) {
            return error
        }

    }

    async getCarts(queryObj = null) {

        try {
            let queryObjNew;

            if (!queryObj) {
                queryObjNew = {
                    order: null,
                    limit: null
                };
            } else {
                queryObjNew = queryObj
            }

            const { order } = queryObjNew
            const { limit } = queryObjNew

            const existeArchivo = fs.existsSync(this.path)

            if (existeArchivo) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                const infoParsed = JSON.parse(info)
                const infoSorted = await this.infoSorter(order, infoParsed)
                const infoLimited = await this.infoLimiter(limit, infoSorted)

                return infoLimited

            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async getCartsbyID(idCart) {
        try {
            const carts = await this.getCarts();
            
            const cart = carts.find(u => u.idCart === idCart)
            if (cart) {
                return cart
            } else {
                return -1
            }
        }
        catch (error) {
            
            return error
        }

    }

    async addProductToCart(params) {
        try {
            const { idCart } = params
            const { idProduct } = params
            
            //traigo todos los carritos creados
            const carritos = await this.getCarts();
            //traigo si existe el carrito seleccionado
            const carrito = await this.getCartsbyID(+idCart);
            //traigo si existe el producto seleccionado
            const producto = await productManagerClass.getProductsbyID(+idProduct);
           
            if (producto === -1) {
                return -1
            }

            if (!carrito) {
                return -1
            }
           
            const ProductosEnCarrito = carrito.products
            const ProductoEnCarrito = ProductosEnCarrito.find(u => u.idProduct === idProduct) ?? null

            //obtengo la posicion del carrito seleccionado en el objeto carritos
            let indiceCarrito = await this.calculaIndiceCarrito(carritos, +idCart)
            
            if (ProductoEnCarrito) {
                //obtengo la posicion del carrito seleccionado en el objeto carritos si existe
                
                let indiceProducto = await this.calculaIndiceProducto(ProductosEnCarrito, idProduct)
                
                const cantidad = +ProductoEnCarrito.quantity +1
                
                carritos[indiceCarrito].products[indiceProducto].quantity = cantidad 
                console.log(carritos[indiceCarrito].products[indiceProducto]);
                await fs.promises.writeFile(this.path, JSON.stringify(carritos))
                    .then(() => console.log(`Producto ${idProduct} dentro del carrito  actualizado a ${cantidad} con exito`))
                    .catch(error => console.log(error))

                return carritos[indiceCarrito]
            } else {
                const newProductToCart = {
                    idProduct: idProduct,
                    quantity: 1
                }

                carrito.products.push(newProductToCart)
                
                carritos[indiceCarrito].products = carrito.products
                
                
                await fs.promises.writeFile(this.path, JSON.stringify(carritos))
                    .then(() => console.log(`Producto ${idProduct} agregado al carrito con exito`))
                    .catch(error => console.log(error))

                return carritos[indiceCarrito]
            }

        } catch (error) {
            console.log(error);
            return error
        }

    }

    async calculaIndiceCarrito(carts, id) {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].idCart === id) {
                return i;
            }
        }
    }

    async calculaIndiceProducto(product, id) {
        for (let i = 0; i < product.length; i++) {
            if (product[i].idProduct === id) {
                return i;
            }
        }
    }

    async isNumber(val) {
        return typeof val === 'number';
    }

    async infoSorter(order, infoParsed) {
        return order === 'ASC' ? infoParsed.sort((a, b) => a.trademark.localeCompare(b.trademark)) :
            order === 'DESC' ? infoParsed.sort((a, b) => b.trademark.localeCompare(a.trademark)) :
                infoParsed
    }

    async infoLimiter(limit, infoSorted) {
        return +limit > 0 ? infoSorted.slice(0, limit) : infoSorted
    }
}

export const cartManagerClass = new cartManager('carts.json')