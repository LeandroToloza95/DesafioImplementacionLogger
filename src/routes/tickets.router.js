import { Router } from "express";
import { ticketController } from "../controllers/tickets.controller.js";
import {authMiddleware} from '../middlewares/auth.middleware.js'
import passport from "passport";

const router = Router();

router.post('/:idCart/purchase',passport.authenticate('jwt', { session: false }),authMiddleware(['user']), ticketController.createTicket )
router.get('/', ticketController.findTickets)
router.get('/:idTicket', ticketController.findTicketById )
router.delete('/:idTicket',passport.authenticate('jwt', { session: false }),authMiddleware(['user']), ticketController.deleteTicketById )
router.put('/:idTicket',passport.authenticate('jwt', { session: false }),authMiddleware(['user']), ticketController.updateTicketById )

export default router