"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Importa la clase Sequelize desde el paquete 'sequelize'
const config_1 = require("./config"); // Importa la configuración de la base de datos
// Crea una instancia de Sequelize con la configuración de la base de datos
const sequelize = new sequelize_1.Sequelize(config_1.config.development.database, config_1.config.development.username, config_1.config.development.password, {
    dialect: 'mysql',
    host: config_1.config.development.host,
    port: config_1.config.development.port
});
exports.default = sequelize; // Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos
