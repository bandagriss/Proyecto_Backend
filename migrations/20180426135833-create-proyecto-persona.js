
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('proyecto_persona', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fid_proyecto: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'proyectos',
        key: 'id'
      }
    },
    fid_persona: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    detalle: {
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
  }),
  down: queryInterface => queryInterface.dropTable('proyecto_persona')
};
