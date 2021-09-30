#!/usr/bin/env node
const { mdLinks } = require('./src/function-mdlinks.js');
const { uniqueLinks, brokenLinks, totalLinks } = require('./src/api.js')

const [, , ...argument] = process.argv;

// *  OPTION STATS

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
    | --stats --validate |                                                        |
    +---------------------+-------------------------------------------------------+
    | --help             | Muestra los comandos                                   |
    +--------------------+--------------------------------------------------------+
    `)
    break;

  default: console.log('Comando no válido. Necesita ayuda ingrese --help');
    break;
  }
}

if (argument.length === 3) {
  if (
    (argument[1] === "--stats" && argument[2] === "--validate") ||
    (argument[1] === "--validate" && argument[2] === "--stats")
  ) {
    mdLinks(argument[0], { validate: true })
      .then(resolve => console.log(`${totalLinks(resolve)} \nUnique: ${uniqueLinks(resolve)} ${brokenLinks(resolve)}`))
      .catch(reject => console.log(reject));
  } else {
    console.log('Comando no válido. Necesita ayuda ingrese --help.');
  }
}
