"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const User_1 = require("../models/User");
const user_services_1 = require("../services/user.services");
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_services_1.checkRequestUserFields)(req, res);
    const { username, email, password } = req.body;
    (0, user_services_1.checkNotExistUser)(email);
    // Crea el usuario
    const user = yield User_1.default.create({ username, email, password });
    res.status(200).send(user);
});
exports.createUserHandler = createUserHandler;
