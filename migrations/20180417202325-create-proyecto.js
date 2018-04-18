'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('proyectos', {
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
      fid_financiador: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'financiadores',
          key: 'id'
        }
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      codigo_proyecto: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      cantidad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      poblacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resultado: {
        type: Sequelize.STRING
      },
      objetivo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('proyectos');
  }
};
