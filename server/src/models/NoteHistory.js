import sequelizeConnection from "../conectionDB.js";
import { DataTypes } from "sequelize";
import { Note } from "./note.js";

const NoteHistory = sequelizeConnection.define(
  "NoteHistory",
  {
    // Campos similares al modelo Note
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "inactive",
      validate: {
        isIn: [["active", "inactive"]],
      },
    },
  },
  {
    tableName: "note_history", // Nombre de la tabla para el historial de notas
  }
);
NoteHistory.sync().then(() => {
  // Establece la relación con la nota original
  NoteHistory.belongsTo(Note);
});
export { NoteHistory };
