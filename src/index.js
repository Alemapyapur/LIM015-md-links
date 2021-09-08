// El path módulo proporciona utilidades para trabajar con rutas de directorio y archivos.
const path = require('path');
// proporciona utilidades para trabajar con rutas de directorio y archivos
const fs = require('fs');
// permite solicitar un recurso de forma asincrónica
// const fetch = require('node-fetch');
// const marked = require('marked');

// *Función que valida la ruta
// const validatePath = (paths) => fs.existsSync(paths);

// *Función que valida la ruta, si es Path Absoluto, y si es Path Relativo lo convierte en Path Absoluto
const validatePathAbsolute = (paths) => fs.existsSync(paths) ? path.normalize(path.resolve(paths)): "El path no existe";
// console.log(pathAbsolute(paths));

// *Función que valida un archivo, statSync(devuelve información sobre la ruta)
const validateFile = (paths) => fs.statSync(paths).isFile();
// console.log(validateFile(paths));

// *Función que valida si el path es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory();
// console.log(validateDirectory(paths));

// *Función que lee el directorio
const validateReadDirectory = (paths) => fs.readdirSync(paths);
// console.log(validateReadDirectory(paths));

// *Función que extrae si tiene extención .md con extname (valida archivo .md)
const validateMd = (paths) => path.extname(paths) === '.md';
// console.log(validateMd(paths));

// *Función que lee un archivo y lo convierte en una cadena
const validateReadfile = (paths) => fs.readdirSync(paths).toString();
// console.log(validateReadfile(paths));

// *Despues de leer un directorio, junta el nombre de los archivos con su ruta
const fileWithPath = (paths) => {
  return validateReadDirectory(paths).map((index) => path.join(paths, index));
};

//* Funcion para extraer cada archivo .md con su ruta
const abstractPathFilesMd = (paths) => {
  let arrayPathFilesMd = [];
  const pathAbsolute = validatePathAbsolute(paths);
  if (validateFile(pathAbsolute) && (validateMd(pathAbsolute) === '.md')){
    arrayPathFilesMd.push(pathAbsolute);
  } else if (isDirectory(pathAbsolute) && readDirectory(pathAbsolute).length !== 0){
    fileWithPath(pathAbsolute).forEach((elemento) => {
      const newRouteWithFile = elemento;
      const saveRoutesNew = abstractPathFilesMd(newRouteWithFile);
      arrayPathFilesMd = arrayPathFilesMd.concat(saveRoutesNew);
    });
  }
  return arrayPathFilesMd;
};


module.exports = {
  validatePathAbsolute,
  validateFile,
  validateDirectory,
  validateReadDirectory,
  validateMd,
  validateReadfile,
  fileWithPath,
  abstractPathFilesMd,
}