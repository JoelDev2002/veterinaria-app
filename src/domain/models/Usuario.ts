export interface Usuario{
  id: string;
  nombre: string;
  email: string;

}

export interface LoginCredenciales{
  email: string;
  password: string;
}

export interface RegisterCredenciales{
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
}