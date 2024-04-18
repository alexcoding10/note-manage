import sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DATABASE_SQL;
const user = process.env.USER_SQL;
const password = process.env.PASSWORD_SQL;
const host = process.env.HOST_SQL;
const port = process.env.PORT_SQL;

const sequelizeConnection = new sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  port: port,
});

export default sequelizeConnection;
