// *  Importando módulos
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

// * Función que valida la ruta
const validatePath = (paths) => fs.existsSync(paths);

// * Función que valida la ruta, si es Path Absoluto, y si es Path Relativo lo convierte en Path Absoluto
const validatePathAbsolute = (paths) => fs.existsSync(paths) ? path.normalize(path.resolve(paths)): "La ruta no existe";

// * Función que valida un archivo
const validateFile = (paths) => fs.statSync(paths).isFile();

// * Función que valida si el path es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory();

// * Función que lee el directorio
const validateReadDirectory = (paths) => fs.readdirSync(paths);

// *  Función que valida archivo .md, verifica si tiene extención .md con extname
const validateMd = (paths) => path.extname(paths) === '.md';

// * Función que lee un archivo .md
const validateReadFileMd = (paths) => fs.readFileSync(paths, 'utf8');

// * Función que lee un archivo y lo convierte en una cadena
const validateReadfile = (paths) => fs.readFileSync(paths).toString();

// * Función que despues de leer un directorio, junta el nombre de los archivos con su ruta
const validatefileWithPath = (paths) => {
  return validateReadDirectory(paths).map((index) => path.join(paths, index));
};

// * Función para buscar archivos .md con su ruta para poder guardarlos los archivos en un array
const searchPathMd = (paths) => {
  const pathAbsolute = validatePathAbsolute(paths);
  let filesArray = [];
  if (validatePathAbsolute(pathAbsolute) && validateFile(paths)) {
    if (validateMd(pathAbsolute)) {
      filesArray.push(pathAbsolute);
    }
  } else {
    const validateReadDirectorys = validateReadDirectory(paths);
    validateReadDirectorys.forEach((paths) => {
      filesArray = filesArray.concat(searchPathMd(path.join(pathAbsolute, paths)));
    });
  }
  return filesArray;
};

// *  Función para extraer los links de un archivo .md, devuelve array de objetos
const extractLinksMd = (paths) => {
  const linksMd = searchPathMd(paths);
  let linksArray = [];
  linksMd.forEach((file) => {
    const validateReadFilesMds = validateReadFileMd(file);
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
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


// HTTP
// * Función para validar los links que se extrajeron de un archivo .md
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

// STATS
// * Función de verificar cantidad de links unicos (uniqueLinks)
const uniqueLinks = (links) => {
  const unique = new Set(links.map(elem => elem.href));
  return unique.size;
};

// * Función de verificar cantidad de links rotos (broken Link)
const brokenLinks = (links) => {
  const broken = links.filter((elem) => elem.message >= 400 || elem.statusText == 'NOT FOUND')
  const brokenLink = `\nBroken: ${broken.length}`;
  return brokenLink;
};

// *  Función de devuelve cantidad de links totales
const totalLinks = (link) => {
  const total = link.map(link => link.href);
  const totalLink = `\nTotal: ${total.length}`;
  return totalLink;
};

// *  Modulo para exportar las Funciónes declaradas
module.exports = {
  validatePath, validatePathAbsolute, validateFile,
  validateDirectory, validateReadDirectory, validateMd,
  validateReadFileMd, validateReadfile, validatefileWithPath,
  searchPathMd, extractLinksMd, validateLink,
  uniqueLinks, brokenLinks, totalLinks
};
