import sequelizeConnection from "../conectionDB.js";
import { DataTypes } from "sequelize";

const Note = sequelizeConnection.define(
    "Note",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: { // Agregar la columna content
            type: DataTypes.STRING, // O el tipo de dato apropiado
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "active",
            validate: {
                isIn: [["active", "inactive", "deleted"]],
            },
        },
    },
    {
        tableName: 'note'
    }
);

Note.sync()

export { Note };
