
module.exports = (sequelize, DataTypes) => {
  var Proyecto = sequelize.define('Proyecto', {
    nombre: DataTypes.STRING,
    fid_institucion: DataTypes.INTEGER,
    fid_financiador: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    codigo_proyecto: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    cantidad: DataTypes.INTEGER,
    poblacion_hombres: DataTypes.STRING,
    poblacion_mujeres: DataTypes.STRING,
    resultado: DataTypes.STRING,
    objetivo: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Proyecto.belongsTo(models.Institucion, {
          allowNull: false
        });
        Proyecto.belongsTo(models.Financiador, {
          allowNull: false
        });
        Proyecto.hasMany(models.Fase);
        Proyecto.hasMany(models.ProyectoPersona);
      }
    },
    tableName: 'proyectos',
    timestamps: true,
    paranoid: true
  });
  return Proyecto;
};
