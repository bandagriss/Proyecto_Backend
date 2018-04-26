
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('financiador_persona', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fid_financiador: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'financiadores',
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
      type: Sequelize.STRING(500)
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
  down: queryInterface => queryInterface.dropTable('financiador_persona')
};
