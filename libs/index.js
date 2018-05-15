
function optenerParametros(req, columnas) {
  const nuevoObjeto = {};
  for (const i of columnas) {
    if (req.body[i] !== undefined) {
      nuevoObjeto[i] = req.body[i];
    }
  }
  return nuevoObjeto;
}


function Success(res, datos, mensaje) {
  res.status(200).send({
    finalizado: true,
    mensaje,
    datos
  });
}

function Error(res, error, mensaje) {
  res.status(400).send({
    finalizado: false,
    mensaje,
    error
  });
}


module.exports = {
  optenerParametros,
  Success,
  Error
};

