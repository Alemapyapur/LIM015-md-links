#!/usr/bin/env node
const { mdLinks } = require('./src/function-mdlinks.js');
const { uniqueLinks, brokenLinks, totalLinks } = require('./src/api.js')

// const arg = process.argv[2];
// Retorna un arr con los arg pasados a la terminal, 1 ejecutable node, 2 ruta del ejecutabl,3 args
const [, , ...argument] = process.argv;

// ********************************* STATS ******************************** //

// // *Función de verificar cantidad de links unicos (uniqueLinks)
// const uniqueLinks = (links) => {
//   const totalLinks = links.map((elem) => elem.href).length;
//   const linksUnique = [...new Set(links.map((elem) => elem.href))];
//   return `Total: ${totalLinks}\nUnique: ${linksUnique.length}`;
// };

// // *Función de verificar cantidad de links rotos (broken Link)
// const brokenLinks = (links) => {
//   const broken = links.map((item) => item.message).filter(elem => elem === 'fail').length;
//   return `Broken: ${broken}`;
// };

// stats = total unique
// validate y stats = total unique broken
// validate = 5 propiedades
// mdlink y ruta = 3 propiedades

// `Total: ${links.length} \nUnique: ${unique.length}`
/*
console.log(process.argv[0]); //node (length 1)
console.log(process.argv[1]); //mdlinks (length 2)
console.log(process.argv[2]); // path (length 3)
console.log(process.argv[3]); // validate  or stats (length 4)
console.log(process.argv[4]); // stats or validate(length 5)
console.log("*", process.argv.length);*/

// ***************************** OPTION - STATS *************************** //

if (argument.length === 1) {
  mdLinks(argument[0], { validate: false })
  .then(resolve => {console.log(resolve)})
  .catch(reject => console.log(errMsg, reject));
}

if (argument.length === 2) {
  switch (argument[1]) {
  case '--validate':
    mdLinks(argument[0], { validate: true })
    // .then(resolve => {console.log(resolve)})
    .then(resolve => {
      resolve.map((objeto) => {
        console.log(`${objeto.file}  ${objeto.href}  ${objeto.statusText}  ${objeto.status}  ${objeto.text.slice(0, 50)}`); }) 
    })
    .catch(reject => console.log(errMsg, reject));
    break;

  case '--stats':
    mdLinks(argument[0], { validate: true })
      .then(resolve => console.log(`${totalLinks(resolve)} \nUnique: ${uniqueLinks(resolve)}`))
      .catch(reject => console.log(reject));
    break;

  case '--pamela':
    mdLinks(argument[0], { validate: true })
      .then(resolve => console.log(`${brokenLinks(resolve)}`))
      .catch(reject => console.log(reject));
  break;


  case '--help':
    console.log(`
    --------------------------------------------------------------------------------------------------------------
    '--validate' muestra la ruta, enlace, numero de status, status cada link (OK o FAIL) y el texto
    '--stats' muestra el número total de links y los links unicos(no se repiten).
    '--stats --validate' muestra el total de links, únicos y rotos.
    --------------------------------------------------------------------------------------------------------------
    `);
    break;

  default: console.log('Lo siento, no es un comando válido. Intente con la opcion --help');
    break;
  }
}

if (argument.length === 3 ) {
  mdLinks(argument[0], { validate: true })
    .then(resolve => console.log(`${uniqueLinks(resolve)}\n${brokenLinks(resolve)}`))
    .catch(reject => console.log(reject));
}

// Me falta validate y stats juntos
// case '--validate':
//     case '--stats':
//     mdLinks(argument[0], { validate: true })
//     .then(resolve => {console.log('probando', resolve)})
//     .catch(reject => console.log("errMsg", reject));
//     break;





// if (args.length === 1) {
//   mdLinks(arg, { validate: false })
//   .then(resolve => {console.log(resolve)})
//   .catch(reject => console.log(errMsg, reject));
// }

// if (args.length === 2) {
//   if (args[1] === '--stats') {
//       mdLinks(arg, { validate: true })
//       .then((resolve) => console.log(totalLink(resolve) + uniqueLink(resolve)))
//       .catch((err) => console.log(errMsg, err));
//   };
//   if (args[1] === '--validate') {
//       mdLinks(arg, { validate: true })
//       .then(resolve => { console.log(resolve)})
//       .catch(reject => console.log(errMsg, reject));
//   };
//   if(args[1] === '--help') {
//       console.log('Listo');
//   };
// };

// if (args.length === 3) {
//   if ((args[1] === '--stats' && args[2] === '--validate') || (args[1] === '--validate' && args[2] === '--stats')) {
//       mdLinks(arg, { validate: true }).then((resolve) => console.log(totalLinks(resolve)))
//           .catch((err) => console.log(errMsg, err));
//   };
// };
// if (args[1] !== '--stats' && args[1] !== '--validate' && args[1] !== undefined && args[1] !== '--help' ) {
//   console.log('No se encontró comando válido, pruebe con: --help')
// };

// // mdLinksModule(process.argv[2], args);