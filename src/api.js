// Importando módulos:
// 1) El path, módulo que proporciona utilidades para trabajar con rutas de directorio y archivos.
const path = require('path');
// 2) El filysistem, modulo que proporciona utilidades para trabajar con rutas de directorio y archivos
// permite solicitar un recurso de forma asincrónica
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
// const { stringify } = require('querystring');

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
// const validateFile = isAPath => fs.lstatSync(isAPath).isFile();
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

// *Función que lee el directorio (Para hacerlo mas recursivo, se uso esta Función dentro de searchPathMd)
const validateReadDirectory = (paths) => fs.readdirSync(paths);
// console.log(validateReadDirectory('./src/pruebas')) // lee los archivos de la carpeta [ 'prueba', 'prueba.js', 'prueba.md', 'prueba.txt' ]
// console.log (validateReadDirectory('./src/pruebas/prueba')); // [ 'prueba1.md', 'prueba2.md', 'prueba3.md' ]
// console.log(validateReadDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas')); // lee los archivos de la carpeta

// *Función que valida archivo .md, verifica si tiene extención .md con extname
// const validateMd = (isAPath) => path.extname(isAPath) === '.md'
const validateMd = (paths) => path.extname(paths) === '.md';
// console.log(validateMd('./src/pruebas/prueba.md')); // true porque es un archivo .md
// console.log(validateMd('./src/pruebas/prueba.js')); // false porque es un archivo .js
// console.log(validateMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); // true
// console.log(validateMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md')); //false

// * --------------------------------------------------------------------------------* //
// * Parece que se obtiene los mismo, averiguar readdirSync y readFilesSync
// *Función que lee un archivo .md
const validateReadFileMd = (paths) => fs.readFileSync(paths, 'utf8');
// console.log(validateReadFileMd('./src/pruebas/prueba.md'));
// devuelve lo que hay dentro del archivo .md Listo [Node.js](https://nodejs.org/es/) [Nodejs.org](https://nodejs.org/docs/latest/api/modules.html)
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
  //se crea un matriz con los elementos encontrados del directorio => une los segmentos de ruta especificados en una ruta
  return validateReadDirectory(paths).map((index) => path.join(paths, index));
};
// console.log(validatefileWithPath('./src/pruebas')); // devuelve los archivos que esta dentro de la carpeta pruebas
// console.log(validatefileWithPath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'));

// *Función para buscar archivos .md con su ruta para poder guardarlos los archivos en un array. (****)

const searchPathMd = (paths) => {
  // console.log({paths})
  const pathAbsolute = validatePathAbsolute(paths);
  let filesArray = [];
  if (validatePathAbsolute(pathAbsolute) && validateFile(paths)) {
    if (validateMd(pathAbsolute)) { //por cada elemento preguntamos si tiene extension .md y la guarda
      filesArray.push(pathAbsolute);
    }
  } else {
    // const validateReadDirectory = fs.readdirSync(paths); //OBS
    const validateReadDirectorys = validateReadDirectory(paths);
    validateReadDirectorys.forEach((paths) => {
      filesArray = filesArray.concat(searchPathMd(path.join(pathAbsolute, paths))); // concat devuelve una nueva matriz sin modificar ninguna matriz existente.
    });
  }
  return filesArray;
};

// console.log(searchPathMd('./src/pruebas/prueba')); //devuelve los archivos .md con sus rutas
// console.log(searchPathMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));
// console.log(searchPathMd('.\\src\\pruebas\\prueba'));

// console.log(searchPathMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'));
// Cuando se llama la carpeta, retorna todos los archivos .md apesar de que esten en otra sub carpeta


// *Función para extraer los links de un archivo .md, devuelve array de objetos
const extractLinksMd = (paths) => {
  const linksMd = searchPathMd(paths);
  let linksArray = [];
  linksMd.forEach((file) => { //forEach() ejecuta la función callback una vez por cada elemento del array;
    const validateReadFilesMds = validateReadFileMd(file);
    const renderer = new marked.Renderer(); // renderer define salida con propiedades
    renderer.link = (href, title, text) => { // busca los links del archivo y solicita los argumentos
    //por cada elemento preguntamos si tiene extension .md y lo extrae
      const linkProperties = {
        href: href,
        text: text,
        file: file
      };
      linksArray.push(linkProperties);
    };
    marked(validateReadFilesMds, { renderer });
  });
  return linksArray;
};

// console.log(extractLinksMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba'));
// console.log(extractLinksMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba1.md')); //retorna pero no reconoce el texto solo los links
// console.log(extractLinksMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba2.md'));
////console.log(extractLinksMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd'));

// ******************************* HTTP ****************************** //
// *Promesa para validar los links que se extrajeron de un archivo .md
const validateLink = (paths) => {
  const linksMd = extractLinksMd(paths);
  const validateLinks = linksMd.map((link) => fetch(link.href)
    .then((res) => {
      if (res.status >= 200 && res.status < 400) {
      return {
        ...link,
        statusText: res.statusText,
        message: res.status,
      };
      }
      return {
        ...link,
        statusText: 'FAIL',
        message: res.status,
      };
    })
    .catch(err => ({
      ...link,
      statusText: 'NOT FOUND',
      message: err.message,
    })));
  return Promise.all(validateLinks);
};

//validateLink('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebas3.md').then(resolve => {console.log(resolve)}).catch(reject => console.log(reject));
//validateLink('https://docs.npmjs.com/cli/install').then(response => (console.log(response)));
    // validateLink('https://docs.npmjs.com/cli/install').then(resolve => {
    //     console.log(resolve);
    //   }).catch(reject => console.log(reject));

// ******************************* STATS ****************************** //

// *Función de verificar cantidad de links unicos (uniqueLinks)
const uniqueLinks = (links) => {
  const unique = new Set(links.map(elem => elem.href));
  //const uniqueLink = `\nUnique: ${unique.size}`;
  return unique.size;
};
// console.log(uniqueLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba3.md'));

// *Función de verificar cantidad de links rotos (broken Link) VERIFICAR SINO PEDIR OH
// const brokenLinks = (links) => links.filter((elem) => elem.status >= 400 || elem.status == 'NOT FOUND')
const brokenLinks = (links) => {
  const broken = links.filter((elem) => elem.message >= 400 || elem.statusText == 'NOT FOUND')
  // console.log(links)
  // const broken = links.filter((elem) => elem.message >= 400)
  // console.log(broken);
  const brokenLink = `\nBroken: ${broken.length}`;
  return brokenLink;
}

// brokenLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba3.md')
//console.log(brokenLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba3.md'));

// *Función de devuelve cantidad de links totales
// const totalLinks = (paths) => new Promise((resolve) => {
//   validateLink(paths)
//   .then((links) => {
//       resolve(`\nTotal: ${links.length}\nUnique: ${uniqueLinks(links)}\nBroken: ${brokenLinks.length}`);
//   });
// });
const totalLinks = (link) => {
  const total = link.map(link => link.href);
  const totalLink = `\nTotal: ${total.length}`;
  return totalLink;
}

//* Modulo para exportar las Funciónes declaradas
module.exports = {
  validatePath, //test lista
  validatePathAbsolute, //test lista
  validateFile, //test lista
  validateDirectory, //test lista
  validateReadDirectory, // OBS
  validateMd, //test lista
  validateReadFileMd, //test listo pero duda
  validateReadfile, //test listo pero duda
  validatefileWithPath, //test lista
  searchPathMd, // falta verificar
  extractLinksMd,
  validateLink,
  uniqueLinks,
  brokenLinks,
  totalLinks
}
