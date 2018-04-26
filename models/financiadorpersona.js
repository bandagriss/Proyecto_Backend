
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
    classMethods: {
      associate(models) {
        FinanciadorPersona.belongsTo(models.Financiador, {
          foreignKey: {
            allowNull: false
          }
        });
        FinanciadorPersona.belongsTo(models.Usuario, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
    tableName: 'financiador_persona',
    timestamps: true,
    paranoid: true
  });
  return FinanciadorPersona;
};
