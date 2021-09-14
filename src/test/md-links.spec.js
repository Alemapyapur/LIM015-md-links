const { validatePath, validatePathAbsolute, validateFile, validateDirectory, validateReadDirectory } = require('../index');

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
