import { Router } from "express";
import { userController } from "../controllers/users.controller.js";

const router = Router();

router.get('/', userController.findUsers )
router.get('/:iduser', userController.findUserById )
router.delete('/:iduser', userController.deleteUserById )
router.put('/:iduser', userController.updateUserById )

export default router