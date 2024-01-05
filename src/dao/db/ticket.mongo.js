import { ticketModel } from "../models/ticket.model.js";

class TicketManagerClass {

    async getTickets(limit=10,order=1,page=1) {
        try {
            const result = await ticketModel.paginate({}, { limit: limit, page: page, sort: { precio: order } })
            return result      
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async getTicketbyID(idProducto) {
        try {
            const product = await ticketModel.findById(idProducto).lean()
            return product
        } catch (error) {
            throw new Error(error);
        }
    }

    async addTicket(obj) {
        try {
            const response = await ticketModel.create(obj)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTicket(idProducto) {
        try {
            const response = await ticketModel.findByIdAndDelete({ _id: idProducto })
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async updateTicket(idProducto, obj) {
        try {
            const response = await ticketModel.findByIdAndUpdate({ _id: idProducto }, { $set: obj })
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const ticketManagerClass = new TicketManagerClass();