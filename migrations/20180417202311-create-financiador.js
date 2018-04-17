'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('financiadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fid_institucion: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'instituciones',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.STRING
      },
      procedencia: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      fecha_fundacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      codigo_registro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      vision: {
        type: Sequelize.STRING
      },
      mision: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('financiadores');
  }
};
