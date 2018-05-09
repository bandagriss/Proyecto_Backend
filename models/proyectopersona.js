
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
    tableName: 'proyecto_persona',
    timestamps: true,
    paranoid: true

  });
  ProyectoPersona.associate = (models) => {
    ProyectoPersona.belongsTo(models.Proyecto, {
      foreignKey: 'fid_proyecto'
    });
    ProyectoPersona.belongsTo(models.Usuario, {
      foreignKey: 'fid_persona'
    });
  };
  return ProyectoPersona;
};
