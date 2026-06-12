export const validarNombre = (valor: string): string | null => {
  if (!valor.trim()) return 'El nombre es obligatorio';
  if (valor.trim().length < 2) return 'Mínimo 2 caracteres';
  return null;
};

export const validarTelefono = (valor: string): string | null => {
  if (!valor.trim()) return 'El teléfono es obligatorio';
  const soloNumeros = /^[0-9]{9}$/;
  if (!soloNumeros.test(valor.trim())) return '"El teléfono debe tener 9 dígitos"';
  return null;
};