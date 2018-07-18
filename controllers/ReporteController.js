const models = require('../models');
const libs = require('../libs');
const pdf = require('../libs/pdf_generator');
const config = require('../config/config.json');

function generarDatosProyecto(idProyecto) {
  return new Promise((resolve, reject) => {
    models.Proyecto.findOne({
      where: {
        id: idProyecto
      },
      include: [
        {
          model: models.Institucion
        },
        {
          model: models.Financiador
        },
        {
          model: models.Fase,
          include: [
            {
              model: models.Documento
            }
          ]
        }
      ],
      order: [[models.Fase, 'createdAt', 'ASC']]
    })
      .then(respuesta => resolve(respuesta))
      .catch(error => reject(error));
  });
}

function reporteProyecto(req, res) {
  generarDatosProyecto(req.params.id)
    .then((respuesta) => {
      // const reporte = Date.parse(new Date());
      const html = './reportes/reporte_proyecto.html';
      // const ruta = `./public/reportes/${reporte}`;
      const configPagina = {
        format: 'Letter',
        orientation: 'portrait',
        border: {
          top: '0.5cm',
          left: '1.5cm',
          right: '1.5cm',
          bottom: '2cm'
        }
      };
      const logo = `${config.url.ruta}reportes/imagenes/logo.png`;
      const datos = respuesta;
      datos.logo = logo;
      return pdf.generarPDFaBuffer(html, datos, configPagina)
        .then((filePDF) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'X-Requested-With');
          res.header('content-type', 'application/pdf');
          res.header('Content-Disposition', 'inline; filename="reporte.pdf');
          res.send(filePDF);
        });
    }).catch((error) => {
      libs.Error(error);
    });
}


module.exports = {
  reporteProyecto
};
