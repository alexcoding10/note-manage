import { Router } from "express";
import routerUser from "./user.router.js";
import routerNote from "./note.router.js";
import routerLogin from "./login.router.js";

const router = Router();

router.use('/api', routerUser)
router.use('/api', routerNote)
router.use('/api', routerLogin)

export default router; 