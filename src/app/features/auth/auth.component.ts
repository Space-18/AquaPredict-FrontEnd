import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import * as models from '../../core/models';
import * as services from '../../core/services';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  public user: models.auth.LoginRequest = { usuario: '', password: '' };
  showPassword = false;
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly authService: services.AuthService,
    private readonly alertService: services.AlertService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Iniciar Sesión - AquaPredict');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.user?.usuario == null || this.user.password == null) {
      this.alertService.error('Error Login', 'Username o password vacías!');
      return;
    }
    this.showLoading = true;
    this.authService.login(this.user).subscribe({
      next: async (response) => {
        // let objPayload = JSON.parse(atob(response.jwt.split(".")[1]))
        // console.log("username-" + objPayload.iss)
        // console.log("tiempo de Inicio del Token-" + new Date(objPayload.iat * 1000))
        // console.log("tiempo de expiracion-" + new Date(objPayload.exp * 1000))
        // console.log("Id-" + objPayload.userId)

        this.authService.setToken(response.token);

        const jsonFromToken = JSON.parse(atob(response.token.split(".")[1]));

        response.user = jsonFromToken;
        response.expiresIn = jsonFromToken.exp * 1000; // Convert to milliseconds

        // this.authService.guardarUsuario(this.user);
        // console.log("usuario>>>>>>>>>>>>>>>",this.user);
        console.log(response);


        // swal.fire('Login', `Hola ${this.user.email}, has iniciado sesión con éxito!`, 'success');
        this.alertService.success('Login', `Hola ${response.user.fullName}, has iniciado sesión con éxito!`);
        this.showLoading = false;
        this.router.navigate(['app']);
      },
      error: (err) => {
        if (err.status == 401) {
          console.log(err)
          // swal.fire('Login',"Ingrese credenciales válidas.", 'error');
          this.alertService.error('Login', "Ingrese credenciales válidas.");
          this.showLoading = false;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
