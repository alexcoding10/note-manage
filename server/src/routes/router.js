import { Router } from "express";
import routerUser from "./user.router.js";
import routerNote from "./note.router.js";

const router = Router();

router.use('', routerUser)
router.use('', routerNote)

export default router;