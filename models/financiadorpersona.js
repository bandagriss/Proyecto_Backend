
module.exports = (sequelize, DataTypes) => {
  var FinanciadorPersona = sequelize.define('FinanciadorPersona', {
    fid_financiador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fid_persona: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    detalle: DataTypes.STRING
  }, {
    tableName: 'financiador_persona',
    timestamps: true,
    paranoid: true
  });
  FinanciadorPersona.associate = (models) => {
    FinanciadorPersona.belongsTo(models.Financiador, {
      foreignKey: 'fid_financiador'
    });
    FinanciadorPersona.belongsTo(models.Usuario, {
      foreignKey: 'fid_persona'
    });
  };
  return FinanciadorPersona;
};
