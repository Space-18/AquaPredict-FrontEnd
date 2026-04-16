import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as models from '../../core/models';
import * as services from '../../core/services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  public user?: models.auth.LoginRequest;
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

  async onLogin() {
    console.log(this.user)
    if (this.user?.username == null || this.user.password == null) {
      this.alertService.error('Error Login', 'Username o password vacías!');
      return;
    }
    this.showLoading = true;
    await this.authService.login(this.user).subscribe({
      next: async (response) => {
        // let objPayload = JSON.parse(atob(response.jwt.split(".")[1]))
        // console.log("username-" + objPayload.iss)
        // console.log("tiempo de Inicio del Token-" + new Date(objPayload.iat * 1000))
        // console.log("tiempo de expiracion-" + new Date(objPayload.exp * 1000))
        // console.log("Id-" + objPayload.userId)

        this.authService.setToken(response.jwt);

        // this.authService.guardarUsuario(this.user);
        // console.log("usuario>>>>>>>>>>>>>>>",this.user);


        // swal.fire('Login', `Hola ${this.user.email}, has iniciado sesión con éxito!`, 'success');
        this.alertService.success('Login', `Hola ${response.user.username}, has iniciado sesión con éxito!`);
        this.showLoading = false;
        this.router.navigateByUrl('/app/dashboard');
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
