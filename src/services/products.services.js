import { productManagerClass } from '../dao/factory.js'
class ProductsService {
    createOne = async (obj) => {
        const createdProduct = await productManagerClass.addProduct(obj)
        return createdProduct
    }

    findAll = async (limit, sort, page) => {
        if (!limit) {
            limit = 10
        }
        if (!page) {
            page = 1
        }
        let order
        if (sort) {
            switch (sort) {
                case 'ASC':
                    order = 1
                    break;
                case 'DESC':
                    order = -1
                    break;
                default:
                    order = 1
                    break;
            }
        } else {
            order = 1
        }

        const result = await productManagerClass.getProducts(limit, order, page)
        const info = {
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : null,
            hasNextPage: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : null

        }

        return { status: 'success', payload: result.docs, info }

    }

    findById = async (idProduct) => {
        const product = await productManagerClass.getProductsbyID(idProduct)
        if (!product) {
            const response = -1
            return response
        }
        return product
    }

    deleteOne = async (idProduct) => {
        const deletedProduct = await productManagerClass.deleteProduct(idProduct)
        if (!deletedProduct) {
            return -1
        }
        return deletedProduct
    }

    updateOne = async (idproduct, obj) => {
        const updatedProduct = await productManagerClass.updateProduct(idproduct, obj)
        if (!updatedProduct) {
            return -1
        }
        return updatedProduct
    }
}
export const productService = new ProductsService()