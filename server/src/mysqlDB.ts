import { Sequelize } from 'sequelize'; // Importa la clase Sequelize desde el paquete 'sequelize'
import { config } from './config'; // Importa la configuración de la base de datos

// Crea una instancia de Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: 'mysql',
    host: config.development.host,
    port: config.development.port
  }
);

export default sequelize; // Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos
