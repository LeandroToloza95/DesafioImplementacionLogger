import { ticketService } from '../services/tickets.services.js'
class TicketsController {
    createTicket = async (req, res) => {
        try {
            //validacion del body de campos obligatorios

            const { user, cart_id, products } = req.body
            const obj={user, cart_id, products}

            if (!user || !cart_id || !products) {
                return res.amount(400).json({ message: 'Information sent is incompleted' })
            }

            const newTicket = await ticketService.createOne(obj)
            //const responseMessage = { success: true, message: `New ticket created with id ${newTicket.id}` , tickets: newTicket};

            return res.status(200).json({ message: newTicket })

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    findTickets = async (req, res) => {
        try {

            const { limit, sort, page } = req.query

            const tickets = await ticketService.findAll(limit, sort, page)

            if (!tickets) {
                return res.status(200).json({ message: 'No tickets found' })
            }

            let mensajeLimite = 'without limit'
            if (limit && +limit > 0) {
                mensajeLimite = `limited to ${limit} elements`
            }

            let mensajeOrden = 'without sort'
            if (sort && (sort == 'DESC' || sort == 'ASC')) {
                mensajeOrden = `ordered to ${sort}`
            }

            return res.status(200).json({ message: `Tickets found ` + mensajeLimite + " " + mensajeOrden, "payload": tickets })
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    findTicketById = async (req, res) => {

        try {
            const { idTicket } = req.params
            const tickets = await ticketService.findById(idTicket)
            if (tickets === -1) {
                return res.status(400).json({ message: 'Ticket no found' })
            }
            return res.status(200).json({ message: `Tickets with id ${idTicket}`, ticket: tickets })

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }

    deleteTicketById = async (req, res) => {
        try {
            const { idTicket } = req.params
            const ticketDeleted = await ticketService.deleteOne(idTicket)

            if (ticketDeleted === -1) {
                return res.status(400).json({ message: 'Ticket no found' })
            }

            return res.status(200).json({ message: `Ticket deleted with id ${idTicket}`, tickets: ticketDeleted })

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    updateTicketById = async (req, res) => {
        try {
            const { idTicket } = req.params
            const obj = req.body

            const ticketUpdated = await ticketService.updateOne(idTicket, obj)

            if (ticketUpdated === -1) {
                return res.status(400).json({ message: 'Ticket no found' })
            }
            return res.status(200).json({ message: `Ticket updated with id ${idTicket}`, tickets: ticketUpdated })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const ticketController = new TicketsController();