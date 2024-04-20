import sequelizeConnection from "../conectionDB.js";
import { DataTypes } from "sequelize";
import { Note } from "./note.js"; // Asegúrate de importar el modelo Note correctamente

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

// Establece la relación con el modelo Note

// Sincroniza los modelos
NoteHistory.sync().then(() => {
  // Establece la relación con el historial de notas
  NoteHistory.belongsTo(Note);
});
export { NoteHistory };
