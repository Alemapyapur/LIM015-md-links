const { validatePath, validatePathAbsolute, validateFile, validateDirectory,
  validateReadDirectory, validateMd, validateReadFileMd, validateReadfile, validatefileWithPath, searchPathMd,
} = require('../index');

// *Función que valida la ruta
describe('Función que valida la ruta:', () => {
  it('Debería retornar true, si el path existe', () => {
    expect(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src')).toBe(true);
  });

  it('Debería retornar false, si el path no existe', () => {
    expect(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015\\directorio')).toBe(false);
  });
});

// *Función que valida la ruta, si es Path Absoluto, y si es Path Relativo lo convierte en Path Absoluto
describe('Función que cambia el Path a Absoluto:', () => {
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
  it('Debería retornar los archivos que hay en un directorio', () => {
    //Se crea una variable filePruebas donde se menciona los archivos de la carpeta prueba, para comparar con lo que devuelva.
    const filePruebas = [ 'prueba', 'prueba.js', 'prueba.md', 'prueba.txt' ];
    expect(validateReadDirectory('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas'))
    .toEqual(filePruebas);
  });
});

// *Función que extrae si tiene extención .md con extname (valida archivo .md)
describe('Función que valida un archivo .md:', () => {
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
  it('Debería retornar el contenido del archivo .md', () => {
    expect(validateReadFileMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toEqual('Listo [Node.js](https://nodejs.org/es/) [Nodejs.org](https://nodejs.org/docs/latest/api/modules.html)');
  });
});

// *Función que lee un archivo y lo convierte en una cadena
describe('Función que lee un archivo:', () => {
  it('Debería retornar el contenido del archivo', () => {
    expect(validateReadfile('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md'))
    .toEqual('Listo [Node.js](https://nodejs.org/es/) [Nodejs.org](https://nodejs.org/docs/latest/api/modules.html)');
  });
});


// *Despues de leer un directorio, junta el nombre de los archivos con su ruta
describe('Función que junta los nombres de los archivos con sus rutas:', () => {
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
    it('Debería retornar solo archivos .md con su ruta', () => {
    //Se crea una variable fileMd donde se menciona las rutas de la carpeta pruebas, para comparar con lo que devuelva.
      const fileMd = [
        // 'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba.md',
        'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba1.md',
        'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba2.md',
        'C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\prueba3.md',
      ];
      expect(searchPathMd('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\pruebas\\prueba\\'))
      .toEqual(fileMd);
    });
  });