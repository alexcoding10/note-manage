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
exports.checkNotExistUser = exports.checkRequestUserFields = void 0;
const User_1 = require("../models/User");
//verifica que se envien todos los campos necesarios
const checkRequestUserFields = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).send({ message: "Por favor, rellena todos los campos" });
        return;
    }
};
exports.checkRequestUserFields = checkRequestUserFields;
// Verifica que el usuario no exista
const checkNotExistUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_1.default.findOne({ where: { email } });
    if (userExists) {
        return true;
    }
    return false;
});
exports.checkNotExistUser = checkNotExistUser;
