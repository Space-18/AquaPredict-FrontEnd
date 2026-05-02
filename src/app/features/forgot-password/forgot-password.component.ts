import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email = '';
  submitted = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    this.submitted = true;
    setTimeout(() => {
      this.router.navigate(['/app/login']);
    }, 3000);
  }
}
