'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar la columna NoteId a la tabla NoteHistory
    await queryInterface.addColumn('NoteHistory', 'NoteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Note', // Nombre de la tabla a la que se hace referencia
        key: 'id', // Nombre de la columna de la tabla a la que se hace referencia
      },
    });

    // Establecer la relación entre NoteHistory y Note
    await queryInterface.addConstraint('NoteHistory', {
      fields: ['NoteId'],
      type: 'foreign key',
      name: 'fk_NoteHistory_Note',
      references: {
        table: 'Note',
        field: 'id',
      },
      onDelete: 'CASCADE', // Opcional: especifica la acción a realizar cuando se elimina una nota
      onUpdate: 'CASCADE', // Opcional: especifica la acción a realizar cuando se actualiza una nota
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios realizados en la migración
    await queryInterface.removeColumn('NoteHistory', 'NoteId');
    await queryInterface.removeConstraint('NoteHistory', 'fk_NoteHistory_Note');
  }
};