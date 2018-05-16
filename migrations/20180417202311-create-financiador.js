
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('financiadores', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
      type: Sequelize.STRING
    },
    vision: {
      type: Sequelize.STRING
    },
    mision: {
      type: Sequelize.STRING
    },
    pais_origen: {
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
  down: queryInterface => queryInterface.dropTable('financiadores')
};
