// Importa la clase Sequelize y el objeto DataTypes desde 'sequelize'
import { DataTypes, Model } from "sequelize";
import sequelize from "../mysqlDB"; // Importa la instancia de Sequelize creada anteriormente
import  Note  from "./Note";
import bcrypt from 'bcrypt';


class User extends Model {}

// Define el modelo de usuario
User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: "User",
});

// Antes de crear el usuario, hashea la contraseña
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // 10 es el número de rondas de encriptación
  user.password = hashedPassword;
});

User.belongsToMany(Note, { through: "noteUser" });

User.sync();

export default User ;
