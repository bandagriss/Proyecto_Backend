
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('instituciones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fid_departamento: {
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'departamentos',
        key: 'id'
      }
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true
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
  down: queryInterface => queryInterface.dropTable('instituciones')
};
