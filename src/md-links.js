#!/usr/bin/env node
const apiPage = require('./api.js');

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
        // console.log({getLinks})
        if (options.validate === true) {
          const validLinks = getLinks.map((links) => {
            const getLinkValid = apiPage.validateLink(links.file);
            // console.log({validLinks})
            return getLinkValid;
          });
            resolve(Promise.all(validLinks));
          } else {
            resolve(getLinks);
          }
      } else {
        reject('La ruta no existe');
      }
    }
  });

// const mdLinks = (path, options) => new Promise((resolve, reject) => {
//   const absolutePath = apiPage.validatePathAbsolute(path);
//   const validPath = apiPage.validatePath(absolutePath);
//   if (validPath === false) {
//       reject("La ruta no existe.");
//   } else {
//     const getFiles = apiPage.searchPathMd(absolutePath);
//     const noseusar = getFiles.map((link) => {
//     const getLinks = apiPage.extractLinksMd(link);
//       return getLinks;
//     });
//     if (options && options.validate === true) {
//       const validLinks = getLinks.map((link) => {
//         const getLinkValid = apiPage.validateLink(link);
//           return getLinkValid;
//       });
//       resolve(Promise.all(validLinks));
//     } else {
//       resolve(getLinks);
//     }
//   }
// });

// Cuando pongo true, y la ruta si existe me deberia retorna 5 propiedades href, text, file, file, statusText y message
mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd', { validate: true }).then(resolve => {
  console.log(resolve);
}).catch(reject => console.log(reject));


// Cuando pongo false, y la ruta si existe me deberia retorna 3 propiedades href, text y file
// mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas', { validate: false }).then(resolve => {
//   console.log(resolve);
// }).catch(reject => console.log(reject));

// Cuando pongo false, y la ruta no existe me deberia retorna un mensaje "La ruta no existe"
// mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebasds', { validate: false }).then(resolve => {
//   console.log(resolve);
// }).catch(reject => console.log(reject));

module.exports = { mdLinks };