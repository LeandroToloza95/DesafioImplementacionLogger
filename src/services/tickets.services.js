import { ticketManagerClass } from '../dao/factory.js'
import { productService } from '../services/products.services.js'
import { cartService } from '../services/carts.services.js'

class TicketsService {
    createOne = async (obj) => {
        console.log(obj);
        const products = obj.products
        const productsWithoutStock = []
        const productsToSell = []
        const productChanges = []
        let amountPurchase = 0
        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            const productDB = await productService.findById(product.productId)

            if (productDB.stock >= product.quantity) {
                const productAmount = product.amount
                amountPurchase += productAmount
                productsToSell.push(product)
                await cartService.deleteProductInCart(obj.cart_id, product.productId)
                productChanges.push(await productService.updateOne(product.productId, { "stock": productDB.stock - product.quantity }))
            } else {
                productsWithoutStock.push(product)
            }
        }
        const purchase = {
            "products": productsToSell,
            "amount": amountPurchase,
            "purchaser":obj.user.email
        }
        console.log(purchase);
        const ticket = await ticketManagerClass.addTicket(purchase)
        const result = ({ "productsWithoutStock": productsWithoutStock, "productsToSell": productsToSell, "changes": productChanges,"ticket":ticket });
        return result
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

        const result = await ticketManagerClass.getTickets(limit, order, page)
        const info = {
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage ? `http://localhost:8080/api/tickets?page=${result.prevPage}` : null,
            hasNextPage: result.hasNextPage ? `http://localhost:8080/api/tickets?page=${result.nextPage}` : null

        }

        return { status: 'success', payload: result.docs, info }

    }

    findById = async (idTicket) => {
        const ticket = await ticketManagerClass.getTicketsbyID(idTicket)
        if (!ticket) {
            const response = -1
            return response
        }
        return ticket
    }

    deleteOne = async (idTicket) => {
        const deletedTicket = await ticketManagerClass.deleteTicket(idTicket)
        if (!deletedTicket) {
            return -1
        }
        return deletedTicket
    }

    updateOne = async (idTicket, obj) => {
        const updatedTicket = await ticketManagerClass.updateTicket(idTicket, obj)
        if (!updatedTicket) {
            return -1
        }
        return updatedTicket
    }
}
export const ticketService = new TicketsService()