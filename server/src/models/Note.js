import sequelizeConnection from "../conectionDB.js";
import { DataTypes } from "sequelize";
import { NoteHistory } from "./NoteHistory.js";

const Note = sequelizeConnection.define(
  "Note",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      // Agregar la columna content
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
    tableName: "note",
  }
);

Note.sync().then(() => {
  // Establece la relación con el historial de notas
  Note.hasMany(NoteHistory, { as: "versions" });
});

export { Note };
