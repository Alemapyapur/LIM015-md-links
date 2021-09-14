const { validatePath} = require('../index');

// *Función que valida la ruta
describe('Función que valida la ruta:', () => {
  it('Debería retornar true, si el path existe', () => {
    expect(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015-md-links\\src')).toBe(true);
  });

  it('Debería retornar false, si el path no existe', () => {
    expect(validatePath('C:\\Users\\Alemapyapur\\Desktop\\LABORATORIA\\LIM015\\directorio')).toBe(false);
  });
});
