import sequelizeConnection from "../conectionDB.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelizeConnection.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
      validate: {
        isIn: [["active", "inactive"]],
      },
    },
  },
  {
    hooks: {
      // Hook beforeCreate para encriptar la contraseña antes de guardarla
      async beforeCreate(user) {
        try {
          // Genera un hash de la contraseña utilizando bcrypt
          const hashedPassword = await bcrypt.hash(user.password, 10);
          // Asigna el hash de la contraseña al campo de contraseña del usuario
          user.password = hashedPassword;
        } catch (error) {
          throw new Error("Error hashing password");
        }
      },
    },
    tableName: "user", // Especifica el nombre de la tabla sin pluralizar
  }
);

User.sync(); // Esto sincroniza el modelo con la base de datos

export { User };
