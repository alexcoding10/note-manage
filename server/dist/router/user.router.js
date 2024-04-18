"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const routerUser = (0, express_1.default)();
//Crear Usuario
routerUser.post('/user', userController_1.createUserHandler);
exports.default = routerUser;
