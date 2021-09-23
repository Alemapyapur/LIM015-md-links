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
            const getLinkValid = apiPage.validateLink(links);
            // console.log({getLinkValid})
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
//     const getLinks = getFiles.map((link) => {
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

mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd', true).then(resolve => {
  console.log(resolve);
}).catch(reject => console.log(reject));
//node ./src/md-links.js

// mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebasds', false).then(resolve => {
//   console.log(resolve);
// }).catch(reject => console.log(reject));


module.exports = { mdLinks };