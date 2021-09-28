#!/usr/bin/env node
const { mdLinks } = require('./src/function-mdlinks.js');
const { uniqueLinks, brokenLinks, totalLinks } = require('./src/api.js')

// const arg = process.argv[2];
// Retorna un arr con los arg pasados a la terminal, 1 ejecutable node, 2 ruta del ejecutabl,3 args
const [, , ...argument] = process.argv;

/*
console.log(process.argv[0]); // node (length 1)
console.log(process.argv[1]); // mdlinks (length 2)
console.log(process.argv[2]); // path (length 3)
console.log(process.argv[3]); // validate  or stats (length 4)
console.log(process.argv[4]); // stats or validate(length 5)
console.log("*", process.argv.length);  */

// * +----------------------------------------------------------------------------------------------------------------+
// * |                                                OPTION STATS                                                    |
// * +----------------------------------------------------------------------------------------------------------------+

if (argument.length === 1) {
  mdLinks(argument[0], { validate: false })
  .then(resolve => {
    resolve.map((objeto) => {
    console.log(`${objeto.file} | ${objeto.text} | ${objeto.href}`);})
  })
  .catch(reject => console.log(reject));
}

if (argument.length === 2) {
  switch (argument[1]) {
  case '--validate':
    mdLinks(argument[0], { validate: true })
    // .then(resolve => {console.log(resolve)})
    .then(resolve => {
      resolve.map((objeto) => {
      console.log(`
      ${objeto.file} | ${objeto.text} |
      ${objeto.href} | ${objeto.statusText} | ${objeto.message}`);
      })
    })
    .catch(reject => console.log(reject));
    break;

  case '--stats':
    mdLinks(argument[0], { validate: true })
      .then(resolve => console.log(`${totalLinks(resolve)} \nUnique: ${uniqueLinks(resolve)}`))
      .catch(reject => console.log(reject));
    break;

  case '--validate--stats':
  // case '--validate' && '--stats':
    mdLinks(argument[0], { validate: true })
      .then(resolve => console.log(`${totalLinks(resolve)} \nUnique: ${uniqueLinks(resolve)} ${brokenLinks(resolve)}`))
      .catch(reject => console.log(reject));
    break;


  case '--help':
    console.log(`
    +--------------------+--------------------------------------------------------+
    |      Comandos      |                       Descripción                      |
    +--------------------+--------------------------------------------------------+
    | md-links ruta      | Muestra la ruta, enlace y el texto                     |
    +---------------------+-------------------------------------------------------+
    | --stats            | Muestra el los links totales y unicos                  |
    +--------------------+--------------------------------------------------------+
    | --validate         | Muestra la ruta, el texto, enlace, status y el mensaje |
    +--------------------+--------------------------------------------------------+
    | --validate --stats | Muestra el total de enlaces unicos y rotos             |
    +---------------------+-------------------------------------------------------+
    | --help             | Muestra los comandos                                   |
    +--------------------+--------------------------------------------------------+
    `)
    break;

  default: console.log('Comando no válido. Necesita ayuda ingrese --help');
    break;
  }
}
