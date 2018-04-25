
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('usuarios', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fid_rol: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    fid_institucion: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'instituciones',
        key: 'id'
      }
    },
    nombres: {
      allowNull: false,
      type: Sequelize.STRING
    },
    apellido_paterno: {
      type: Sequelize.STRING
    },
    apellido_materno: {
      type: Sequelize.STRING
    },
    genero: {
      type: Sequelize.ENUM,
      values: ['masculino', 'femenino']
    },
    fecha_nacimiento: {
      allowNull: true,
      type: Sequelize.DATE
    },
    nro_carnet: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    direccion: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.INTEGER
    },
    correo: {
      type: Sequelize.STRING
    },
    imagen: {
      type: Sequelize.STRING
    },
    usuario: {
      allowNull: false,
      type: Sequelize.STRING
    },
    contrasena: {
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
  }),
  down: queryInterface => queryInterface.dropTable('usuarios')
};
