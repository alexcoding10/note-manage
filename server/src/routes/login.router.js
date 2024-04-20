import { Router } from "express";
import {loginHandler} from "../controllers/login.controller.js"

const routerLogin = Router();

routerLogin.post('/login', loginHandler)


export default routerLogin;