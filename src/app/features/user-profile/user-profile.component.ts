import { Component, OnInit } from '@angular/core';
import { UserProfile, UpdateUserCommand } from '../../core/models/user/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileData: UserProfile = {
    user: 'admin',
    id: 0,
    fullName: 'Admin Usuario',
    email: 'admin@aquapredict.pe',
    phone: '+51 999 888 777',
    dni: '12345678'
  };

  savedProfile = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => this.profileData = profile,
      error: () => {}
    });
  }

  onProfileSubmit(): void {
    this.userService.updateProfile(this.profileData).subscribe({
      next: () => this.showSaved(),
      error: () => {}
    });
  }

  private showSaved(): void {
    this.savedProfile = true;
    setTimeout(() => this.savedProfile = false, 3000);
  }
}
