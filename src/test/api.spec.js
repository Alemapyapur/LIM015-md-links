const { validatePath, validatePathAbsolute, validateFile, validateDirectory, validateReadDirectory,
  validateMd, validateReadFileMd, validateReadfile, validatefileWithPath, searchPathMd, extractLinksMd, validateLink,
} = require('../api.js');
const {uniqueLinks, brokenLinks, totalLinks} = require('../api.js')
const { mdLinks } = require('../function-mdlinks.js')

// *Función que valida la ruta
describe('Función que valida la ruta:', () => {
  it('validatePath es una función', () => {
    expect(typeof validatePath).toBe('function');
  });
  it('Debería retornar true, si el path existe', () => {
    expect(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src')).toBe(true);
  });
  it('Debería retornar false, si el path no existe', () => {
    expect(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015\\directorio')).toBe(false);
  });
});

// *Función que valida la ruta, si es Path Absoluto, y si es Path Relativo lo convierte en Path Absoluto
describe('Función que cambia el Path a Absoluto:', () => {
  it('validatePathAbsolute es una función', () => {
    expect(typeof validatePathAbsolute).toBe('function');
  });
  it('Debería retornar la misma ruta', () => {
    expect(validatePathAbsolute('C:\\Users\\Alemapyapur\\Desktop'))
    .toBe('C:\\Users\\Alemapyapur\\Desktop');
  });
  it('Debería retornar el Path Relativo a Absoluto', () => {
    expect(validatePathAbsolute('./src/pruebas'))
    .toBe('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas');
  });
});

// *Función que valida un archivo, statSync(devuelve información sobre la ruta)
describe('Función que valida un archivo:', () => {
  it('validateFile es una función', () => {
    expect(typeof validateFile).toBe('function');
  });
  it('Debería retornar true, si es un archivo', () => {
    expect(validateFile('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toBe(true);
  });
  it('Debería retornar false, si es un directorio', () => {
    expect(validateFile('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links'))
    .toBe(false);
  });
});

// *Función que valida si el path es un directorio
describe('Función valida si es un directorio:', () => {
  it('validateDirectory es una función', () => {
    expect(typeof validateDirectory).toBe('function');
  });
  it('Debería retornar true si es un directorio', () => {
    expect(validateDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'))
    .toBe(true);
  });
  it('Debería retornar false si es un archivo', () => {
    expect(validateDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toBe(false);
  });
});

// *Función que lee el directorio
describe('Función que lee el directorio:', () => {
  it('validateReadDirectory es una función', () => {
    expect(typeof validateReadDirectory).toBe('function');
  });
  it('Debería retornar los archivos que hay en un directorio', () => {
    //Se crea una variable filePruebas donde se menciona los archivos de la carpeta prueba, para comparar con lo que devuelva.
    const filePruebas = [ 'prueba', 'prueba.js', 'prueba.md', 'prueba.txt' ];
    expect(validateReadDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'))
    .toEqual(filePruebas);
  });
});

// *Función que extrae si tiene extención .md con extname (valida archivo .md)
describe('Función que valida un archivo .md:', () => {
  it('validateMd es una función', () => {
    expect(typeof validateMd).toBe('function');
  });
  it('Debería retornar true si es un archivo .md', () => {
    expect(validateMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toBe(true);
  });
  it('Debería retornar false si es no es un archivo .md', () => {
    expect(validateMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.js'))
    .toBe(false);
  });
});

// *Función que lee un archivo .md
describe('Función que lee un archivo .md:', () => {
  it('validateReadFileMd es una función', () => {
    expect(typeof validateReadFileMd).toBe('function');
  });
  it('Debería retornar el contenido del archivo .md', () => {
    expect(validateReadFileMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toEqual('Listo [Node.js](https://nodejs.org/es/) [Nodejs.org](https://nodejs.org/docs/latest/api/modules.html)');
  });
});

// *Función que lee un archivo y lo convierte en una cadena
describe('Función que lee un archivo:', () => {
  it('validateReadfile es una función', () => {
    expect(typeof validateReadfile).toBe('function');
  });
  it('Debería retornar el contenido del archivo', () => {
    expect(validateReadfile('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toEqual('Listo [Node.js](https://nodejs.org/es/) [Nodejs.org](https://nodejs.org/docs/latest/api/modules.html)');
  });
});

// *Despues de leer un directorio, junta el nombre de los archivos con su ruta
describe('Función que junta los nombres de los archivos con sus rutas:', () => {
  it('validatefileWithPath es una función', () => {
    expect(typeof validatefileWithPath).toBe('function');
  });
  it('Debería retornar cada archivo del directorio con su ruta', () => {
    //Se crea una variable filePruebas donde se menciona las rutas de la carpeta pruebas, para comparar con lo que devuelva.
    const filePruebas = [
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.js',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.txt',
    ];
    expect(validatefileWithPath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'))
    .toEqual(filePruebas);
  });
});

// *Función para buscar archivo .md con su ruta para poder guardarlos los archivos en un array.
describe('Función que busca archivos con extensión .md de un file o directorio', () => {
  it('searchPathMd es una función', () => {
    expect(typeof searchPathMd).toBe('function');
  });
  it('Debería retornar solo archivos .md con su ruta', () => {
  //Se crea una variable fileMd donde se menciona las rutas de la carpeta pruebas, para comparar con lo que devuelva.
    const fileMd = [
      // 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba1.md',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba2.md',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba3.md',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba4.md',
      'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md'
    ];
    expect(searchPathMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\'))
    .toEqual(fileMd);
  });
});


// *Función para extraer los links de un archivo .md, devuelve array de objetos
describe('Función que extre los links de un archivo o directorio .md', () => {
  it('extractLinksMd es una función', () => {
    expect(typeof extractLinksMd).toBe('function');
  });
  it('Debería extraer los links que tiene guardados en un archivo .md', () => {
  //Se crea una variable linksMd donde se menciona las rutas de la carpeta pruebas, para comparar con lo que devuelva.
    const linksMd = [
      {
        href: 'https://nodejs.org/docs/latest/api/modules.html',
        text: 'Nodejs.org',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba2.md'
      }
    ];
    // console.log(extractLinksMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba2.md'));
    // console.log(linksMd)
    expect(extractLinksMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba2.md'))
    .toEqual(linksMd);
  });
});

// *Función para validar los links que se extrajeron de un archivo .md
describe('Función que valida los links extraidos', () => {
    it('validateLink es una función', () => {
      expect(typeof validateLink).toBe('function');
    });
    it('Debería validar los links OK extraidos', () => {
    //Se crea una variable returnLinks con la cual se comparara la ruta de prueba, para comparar con lo que devuelva.
      const returnLinks = [
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba1.md',
          statusText: 'OK',
          message: 200
        }
      ];

      return validateLink('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba1.md').then((res) => {
        // console.log(res);
        // console.log(returnLinks);
        expect(res).toEqual(returnLinks)});
    });
    it('Debería validar los links FAIL extraidos', () => {
      //Se crea una variable returnLinks con la cual se comparara la ruta de prueba, para comparar con lo que devuelva.
        const returnsLinks = [
          {
            href: 'https://www.google.com/no-existe',
            text: 'Google Broken',
            file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba4.md',
            statusText: 'FAIL',
            message: 404
          }
        ];
        return validateLink('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba4.md').then((res) => {
          // console.log(res);
          // console.log(returnLinks);
          expect(res).toEqual(returnsLinks)});
      });
});

// mock de data es una data falsa
const validLinks = [
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'Path',
    file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md',
    statusText: 'OK',
    message: 200
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md',
    statusText: 'OK',
    message: 200
  },
  {
    href: 'https://www.google.com/no-existe',
    text: 'Google Broken',
    file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md',
    statusText: 'FAIL',
    message: 404
  }
];

// *Función para validar los links unicos, totales y rotos.
describe('Función que retorna enlaces unicos',() => {
  it('uniqueLinks debería ser una función', () => {
    expect(typeof uniqueLinks).toBe('function');
  });
  it('Debería retornar enlaces unicos', () => {
    expect(uniqueLinks(validLinks)).toBe(3)
  });
});

describe('Función que retorna enlaces rotos',() => {
  it('brokenLinks debería ser una función', () => {
    expect(typeof brokenLinks).toBe('function');
  });
  it('Debería retornar enlaces rotos', () => {
    // console.log(brokenLinks(validLinks))
    expect(brokenLinks(validLinks)).toEqual("\nBroken: 1")
  });
});

describe('Función que retorna enlaces totales',() => {
  it('totalLinks debería ser una función', () => {
    expect(typeof totalLinks).toBe('function');
  });
  it('Debería retornar enlaces totales', () => {
    expect(totalLinks(validLinks))
    .toEqual('\nTotal: 3')
  });
});

// *Función MdLinks
describe('Función MdLinks que valida los links', () => {
  it('Debería retornar un array con sus 3 propiedades si es FALSE.', () => {
    const mdlinksFiles = [
      {
        href: 'https://nodejs.org/api/path.html',
        text: 'Path',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md'
      },
      {
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        text: 'Linea de comando CLI',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md'
      },
      {
        href: 'https://www.google.com/no-existe',
        text: 'Google Broken',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md'
      }
    ];
    return expect(mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md', { validate: false }))
    .resolves.toEqual(mdlinksFiles);
  });

  it('Debería retornar un array con sus 5 propiedades si es TRUE.', () => {
    const mdlinkProp = [
      {
        href: 'https://nodejs.org/api/path.html',
        text: 'Path',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md',
        statusText: 'OK',
        message: 200
      },
      {
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        text: 'Linea de comando CLI',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md',
        statusText: 'OK',
        message: 200
      },
      {
        href: 'https://www.google.com/no-existe',
        text: 'Google Broken',
        file: 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md',
        statusText: 'FAIL',
        message: 404
      }
    ];
    return expect(mdLinks('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\pruebamd\\pruebamdlinks.md', { validate: true }))
    .resolves.toEqual(mdlinkProp);
  });

  test('Debería retornar la ruta no existe, si hay un ERROR.', () => {
    const error  = 'La ruta no existe';
    return expect(mdLinks('../pruebas/prueba/pruebamd/pruebamdlinks2.md')).rejects.toEqual(error);
  });
});



