
module.exports = (sequelize, DataTypes) => {
  var ProyectoPersona = sequelize.define('ProyectoPersona', {
    fid_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fid_persona: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    detalle: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        ProyectoPersona.belongsTo(models.Proyecto, {
          foreignKey: {
            allowNull: false
          }
        });
        ProyectoPersona.belongsTo(models.Usuario, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
    tableName: 'proyecto_persona',
    timestamps: true,
    paranoid: true

  });
  return ProyectoPersona;
};
