export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  role: string;
}

export interface UserDtoPagedResult {
  data: User[];
  totalRecords: number;
}

export interface UserFormData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  password: string;
  confirmPassword: string;
  role: number;
  requirePasswordChange: boolean;
}

export interface UpdateUserCommand {
  user: string;
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dni: string;
}

export interface UpdateUserAdminCommand {
  id: number;
  password: string;
  roleId: number;
}

export interface DeleteUserCommand {
  id: number;
}

export interface UserProfile {
  user: string;
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dni: string;
}

export interface AccessControlFormData {
  userName: string;
  roles: {
    administrador: boolean;
    colaborador: boolean;
    lector: boolean;
  };
}
