import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { RoleTypeEnum } from '../../../core/enums/RoleTypeEnum';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  allowedRoles: RoleTypeEnum[];
}

const ALL_ROLES = [RoleTypeEnum.ADMIN, RoleTypeEnum.ANALYST, RoleTypeEnum.OPERATOR];

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {
  sidebarOpen = true;
  currentPath = '/';
  userRole: RoleTypeEnum | null = null;
  currentUser = { fullName: '', correo: '' };

  private menuItems: MenuItem[] = [
    { path: '/app/', label: 'Dashboard', icon: 'dashboard', allowedRoles: ALL_ROLES },
    { path: '/app/prediction', label: 'Predicción', icon: 'trending', allowedRoles: [RoleTypeEnum.OPERATOR, RoleTypeEnum.ANALYST] },
    { path: '/app/data-form', label: 'Ingreso de Datos', icon: 'file', allowedRoles: [RoleTypeEnum.OPERATOR, RoleTypeEnum.ANALYST] },
    { path: '/app/users', label: 'Gestión de Usuarios', icon: 'users', allowedRoles: [RoleTypeEnum.ADMIN] },
    { path: '/app/profile', label: 'Perfil', icon: 'user', allowedRoles: ALL_ROLES },
  ];

  get filteredMenuItems(): MenuItem[] {
    if (this.userRole === null) return [];
    return this.menuItems.filter(item => item.allowedRoles.includes(this.userRole!));
  }

  private icons: Record<string, string> = {
    dashboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
    trending: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>',
    file: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
    users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>',
    user: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>',
  };

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUser.fullName = payload.fullName || '';
        this.currentUser.correo = payload.correo || '';
        this.userRole = Number(payload.role) ?? null;
      } catch {
        this.userRole = null;
      }
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.url;
      });
    this.currentPath = this.router.url;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/app/login']);
  }

  isActive(path: string): boolean {
    return this.currentPath === path || (path === '/app/' && this.currentPath === '/app');
  }

  getIcon(iconName: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.icons[iconName] || '');
  }
}
