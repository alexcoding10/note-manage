"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("./router/user.router");
const PORT = process.env.PORT || 3333;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(user_router_1.default);
//inicializacion de servidor
app.listen(PORT, () => console.log(`Servidor Express corriendo en http://localhost:${PORT}`));
