import { Router } from "express";
import { logger } from '../winston.js'

const router = Router();

router.get('/', (req, res) => {

    logger.fatal("Probando fatal")
    logger.error("Probando error")
    logger.warning("Probando warning");
    logger.info("Probando info")
    logger.http("Probando http");
    logger.debug("Probando debug");
    
    res.send("Probando winston")

    
})

export default router