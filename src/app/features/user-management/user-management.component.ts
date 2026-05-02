import { Component, OnInit } from '@angular/core';
import {
  User, UserFormData, AccessControlFormData,
  UpdateUserCommand
} from '../../core/models/user/user.model';
import { UserService } from '../../core/services/user.service';
import { AlertService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  totalRecords = 0;
  pageNumber = 1;
  pageSize = 10;
  loading = false;

  showModal = false;
  showAccessModal = false;
  showAdminModal = false;
  editingUser: User | null = null;
  editingAdminUser: User | null = null;
  passwordError = '';

  adminFormData = { password: '', roleId: 1 };

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  formData: UserFormData = this.emptyForm();
  accessFormData: AccessControlFormData = this.emptyAccessForm();

  constructor(private readonly userService: UserService,
     private readonly alertService: AlertService,
     private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe({
      next: (result) => {
        this.users = result.data;
        this.totalRecords = result.totalRecords;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadUsers();
  }

  onPageSizeChange(size: string): void {
    this.pageSize = +size;
    this.pageNumber = 1;
    this.loadUsers();
  }

  handleCreate(): void {
    this.editingUser = null;
    this.formData = this.emptyForm();
    this.passwordError = '';
    this.showModal = true;
  }

  handleEdit(user: User): void {
    this.editingUser = user;
    this.formData = {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      dni: user.dni,
      password: '',
      confirmPassword: '',
      role: 0,
      requirePasswordChange: false
    };
    this.passwordError = '';
    this.showModal = true;
  }

  handleDelete(userId: number): void {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;
    this.userService.deleteUser(userId).subscribe({
      next: () => this.loadUsers(),
      error: () => {}
    });
  }

  handleSave(): void {
    this.passwordError = '';

    if (!this.editingUser && this.formData.password !== this.formData.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return;
    }
    if (this.editingUser && this.formData.password && this.formData.password !== this.formData.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return;
    }

    if (this.editingUser) {
      const cmd: UpdateUserCommand = {
        user: this.editingUser.username,
        id: this.editingUser.id,
        fullName: this.formData.fullName,
        email: this.formData.email,
        phone: this.formData.phone,
        dni: this.formData.dni
      };
      this.userService.updateUser(cmd).subscribe({
        next: () => {
          this.alertService.success('Usuario actualizado correctamente');
          this.loadUsers();
          this.showModal = false;
        },
        error: () => {
          this.alertService.error('Error al actualizar el usuario');
          this.showModal = false;
        }
      });
    } else {
      this.userService.createUser(this.formData).subscribe({
        next: () => {
          this.alertService.success('Usuario creado correctamente');
          this.loadUsers();
          this.showModal = false;
        },
        error: () => {
          this.alertService.error('Error al crear el usuario');
          // this.showModal = false;
        }
      });
    }
  }

  handleAdminEdit(user: User): void {
    this.editingAdminUser = user;
    this.adminFormData = { password: '', roleId: this.getRoleIdFromString(user.role) };
    this.showAdminModal = true;
  }

  private getRoleIdFromString(role: string): number {
    const map: Record<string, number> = {
      'ADMIN': 1, 'ANALYST': 2, 'OPERATOR': 3,
      'Administrador': 1, 'Analista': 2, 'Operador': 3
    };
    return map[role] ?? 1;
  }

  handleAdminSave(): void {
    if (!this.editingAdminUser) return;
    this.userService.updateUserAdmin({
      id: this.editingAdminUser.id,
      password: this.adminFormData.password,
      roleId: this.adminFormData.roleId
    }).subscribe({
      next: () => {
        this.alertService.success('Credenciales actualizadas correctamente');
        this.loadUsers();
        this.showAdminModal = false;
      },
      error: () => { this.showAdminModal = false; }
    });
  }

  handleAccessSubmit(): void {
    this.showAccessModal = false;
    this.accessFormData = this.emptyAccessForm();
  }

  getRoleBadgeClass(role: string): string {
    return role === 'Administrador' ? 'bg-purple-100 text-purple-800'
      : role === 'Analista' ? 'bg-blue-100 text-blue-800'
        : 'bg-green-100 text-green-800';
  }

  isTheSameUser(id:number): boolean {
    return this.authService.getUserId() === id;
  }

  private emptyForm(): UserFormData {
    return { username: '', fullName: '', email: '', phone: '', dni: '', password: '', confirmPassword: '', role: 1, requirePasswordChange: false };
  }

  private emptyAccessForm(): AccessControlFormData {
    return { userName: '', roles: { administrador: false, colaborador: false, lector: false } };
  }
}
