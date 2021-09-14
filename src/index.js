// Importando módulos:
// 1) El path, módulo que proporciona utilidades para trabajar con rutas de directorio y archivos.
const path = require('path');
// 2) El filysistem, modulo que proporciona utilidades para trabajar con rutas de directorio y archivos
// permite solicitar un recurso de forma asincrónica
const fs = require('fs');


// *Función que valida la ruta
const validatePath = (paths) => fs.existsSync(paths);
// console.log(validatePath('./src/pruebas')); // true
// console.log(validatePath('./src/pruebass')); //false
// console.log(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src')); // true
// console.log(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\source')); //false

// *Función que valida la ruta, si es Path Absoluto, y si es Path Relativo lo convierte en Path Absoluto
const validatePathAbsolute = (paths) => fs.existsSync(paths) ? path.normalize(path.resolve(paths)): "La ruta no existe";
// console.log(validatePathAbsolute('./src/pruebas')); // devuelve el path absoluto
// console.log(validatePathAbsolute('./src/pruebass')); // devuelve la ruta no existe

// *Función que valida un archivo, statSync(devuelve información sobre la ruta)
const validateFile = (paths) => fs.statSync(paths).isFile();
// console.log(validateFile('./src/pruebas/prueba.md')); // true
// console.log(validateFile('./src/pruebas')); //false
// console.log(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); // true


// *Función que valida si el path es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory();
// console.log(validateDirectory('./src/pruebas')); //true
// console.log(validateDirectory('./src/pruebas/prueba.md')); // false
// console.log(validateDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas')); //true
// console.log(validateDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); //false

// *Función que lee el directorio
const validateReadDirectory = (paths) => fs.readdirSync(paths);
// console.log(validateReadDirectory('./src/pruebas')) // lee los archivos de la carpeta [ 'prueba', 'prueba.js', 'prueba.md', 'prueba.txt' ]
// console.log(validateReadDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas')); // lee los archivos de la carpeta

// *Función que extrae si tiene extención .md con extname (valida archivo .md)
const validateMd = (paths) => path.extname(paths) === '.md';
// console.log(validateMd('./src/pruebas/prueba.md')); // true porque es un archivo .md
// console.log(validateMd('./src/pruebas/prueba.js')); // false porque es un archivo .js
// console.log(validateMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); // true
// console.log(validateMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); //false

// * --------------------------------------------------------------------------------* //
// * Parece que se obtiene los mismo, averiguar readdirSync y readFilesSync
// *Funcion que lee un archivo .md
const validateReadFileMd = ((paths) => fs.readFileSync(paths, 'utf8'));
// console.log(validateReadFileMd('./src/pruebas/prueba.md')); // devuelve lo que hay dentro del archivo .md Listo [Node.js](https://nodejs.org/es/) [Nodejs.org](https://nodejs.org/docs/latest/api/modules.html)
// console.log(validateReadFileMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); // devuelve lo que hay dentro del archivo .md


// *Función que lee un archivo y lo convierte en una cadena
const validateReadfile = (paths) => fs.readFileSync(paths).toString();
// const validateReadfile = (paths) => fs.readdirSync(paths).toString();
// console.log(validateReadFile('./src/pruebas/prueba.md')); // error
// console.log(validateReadfile('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); // devuelve el contenido
// console.log(validateReadfile('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.txt')); // devuelve el contenido
// * --------------------------------------------------------------------------------* //


// *Despues de leer un directorio, junta el nombre de los archivos con su ruta
const validatefileWithPath = (paths) => {
  return validateReadDirectory(paths).map((index) => path.join(paths, index));
};
// console.log(validatefileWithPath('./src/pruebas')); // devuelve los archivos que esta dentro de la carpeta pruebas
// console.log(validatefileWithPath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'));

//* Modulo para exportar las funciones declaradas
module.exports = {
  validatePath, //test lista
  validatePathAbsolute, //test lista
  validateFile, //test lista
  validateDirectory, //test lista
  validateReadDirectory, //test lista
  validateMd, //test con error
  validateReadFileMd, //test lista pero duda
  validateReadfile, //test lista pero duda
  validatefileWithPath, //test lista
}