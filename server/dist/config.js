"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.config = {
    development: {
        username: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'note_manager',
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
};
