const apiPage = require('./api.js');

// *  FUNCION MD-LINKS

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


module.exports = { mdLinks };