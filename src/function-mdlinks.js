#!/usr/bin/env node
const apiPage = require('./api.js');
// const simplePath = process.argv[2]; // el 2 representa el indice

// * +----------------------------------------------------------------------------------------------------------------+
// * |                                                FUNCION MD-LINKS                                                |
// * +----------------------------------------------------------------------------------------------------------------+

const mdLinks = (path, options) =>
  new Promise((resolve, reject) => {
    if (path === false) {
      reject('Ingrese la ruta');
    } else {
      const absolutePath = apiPage.validatePathAbsolute(path);
      const validPath = apiPage.validatePath(absolutePath);
      if (validPath) {
        const getFiles = apiPage.searchPathMd(absolutePath);
        getFiles.map((link) => {
          return apiPage.extractLinksMd(link);
        });
        const getLinks = apiPage.extractLinksMd(path)
        if (options.validate === true) {
          const validLinks = apiPage.validateLink(absolutePath);
            resolve(validLinks);
        } else {
          resolve(getLinks);
        }
      } else {
        reject('La ruta no existe');
      }
    }
  });


// Cuando pongo true, y la ruta si existe me deberia retorna 5 propiedades href, text, file, file, statusText y message
// mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd', { validate: true })
// .then(resolve => { console.log(resolve) }).catch(reject => console.log(reject));

// mdLinks(simplePath, { validate: true })
// .then(resolve => { console.log(resolve)}).catch(reject => console.log(reject));
// node ./src/md-links.js src\pruebas\prueba\pruebamd\pruebamdlinks.md

module.exports = { mdLinks };