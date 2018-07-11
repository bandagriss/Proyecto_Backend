
const fs = require('fs-extra');
const Q = require('q');
const ejs = require('ejs');
const pdf = require('html-pdf');

const generarPDFaFile = (urlEjsPlantilla, objParametros, rutaSalidaPDF, config) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(urlEjsPlantilla, objParametros, (error, result) => {
      if (result) {
        const options = config ? config :
              {
                format: 'Letter',
                orientation: 'portrait',
                border: {
                  top: '2cm',
                  left: '1.5cm',
                  right: '1.5cm',
                  bottom: '2cm'
                }
              };
        options.filename = rutaSalidaPDF;
        pdf.create(result, options).toFile((errorGen, bufferPDF) => {
          if (errorGen) {
            return reject(errorGen);
          }
          return resolve(bufferPDF);
        });
      }
      else {
        reject(error);
      }
    });
  });
};

const generarPDFaBuffer = (urlEjsPlantilla, objParametros, config) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(urlEjsPlantilla, objParametros, (error, result) => {
      if (result) {
        const options = config ? config :
              {
                format: 'Letter',
                orientation: 'portrait',
                border: {
                  top: '2cm',
                  left: '1.5cm',
                  right: '1.5cm',
                  bottom: '2cm'
                }
              };
        pdf.create(result, options).toBuffer((errorGen, bufferPDF) => {
          if (errorGen) {
            return reject(errorGen);
          }
          return resolve(bufferPDF);
        });
      }
      else {
        return reject(error);
      }
    });
  });
};

const leerPDF = (res, ruta) => {
  const deferred = Q.defer();
  fs.readFile(`${ruta}`, (error, data) => {
    if (error) {
      deferred.reject(new Error('No se pudo encontrar el Documento.'));
    }
    else {
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      res.write(data);
      res.end();
    }
  });
  return deferred.promise;
};

module.exports = {
  generarPDFaFile,
  generarPDFaBuffer,
  leerPDF
};
