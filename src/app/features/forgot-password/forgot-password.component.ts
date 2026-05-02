import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
