export const validarNombre = (valor: string): string | null => {
  if (!valor.trim()) return 'El nombre es obligatorio';
  if (valor.trim().length < 2) return 'Mínimo 2 caracteres';
  return null;
};

export const validarTelefono = (valor: string): string | null => {
  if (!valor.trim()) return 'El teléfono es obligatorio';
  const soloNumeros = /^[0-9]{9}$/;
  if (!soloNumeros.test(valor.trim())) return 'El teléfono debe tener 9 dígitos';
  return null;
};

export const validarMascota = (valor: string): string | null => {
  if (!valor.trim()) return 'El nombre de la mascota es obligatorio';
  if (valor.trim().length < 2) return 'Mínimo 2 caracteres';
  return null;
};

export const validarDescripcion = (valor: string): string | null => {
  if (!valor.trim()) return 'La descripción es obligatoria';
  if (valor.trim().length < 10) return 'Mínimo 10 caracteres';
  return null;
};

export const validarSeleccion = (valor: string, campo: string): string | null => {
  if (!valor) return `Selecciona un ${campo}`;
  return null;
};