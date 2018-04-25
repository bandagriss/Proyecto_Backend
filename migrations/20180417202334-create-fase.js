
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('fases', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fid_proyecto: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'proyectos',
        key: 'id'
      }
    },
    nombre: {
      type: Sequelize.STRING
    },
    fecha_inicio: {
      allowNull: false,
      type: Sequelize.DATE
    },
    fecha_fin: {
      allowNull: false,
      type: Sequelize.DATE
    },
    gastos: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    estado: {
      allowNull: false,
      defaultValue: 'creado',
      type: Sequelize.ENUM,
      values: ['creado', 'en proceso', 'finalizado']
    },
    adjunto: {
      type: Sequelize.STRING
    },
    fecha_inicio_real: {
      type: Sequelize.DATE
    },
    fecha_fin_real: {
      type: Sequelize.DATE
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
  down: queryInterface => queryInterface.dropTable('fases')
};
