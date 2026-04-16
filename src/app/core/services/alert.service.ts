import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private defaultConfig = {
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  };

  constructor() { }

  // Success Alert
  success(title: string, message: string = '', timer: number = 2000) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'success',
      title,
      text: message,
      timer,
      confirmButtonColor: '#10b981',
    });
  }

  // Error Alert
  error(title: string, message: string = '') {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#ef4444',
    });
  }

  // Warning Alert
  warning(title: string, message: string = '') {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'warning',
      title,
      text: message,
      confirmButtonColor: '#f59e0b',
    });
  }

  // Info Alert
  info(title: string, message: string = '') {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'info',
      title,
      text: message,
      confirmButtonColor: '#3b82f6',
    });
  }

  // Confirmation Dialog
  confirm(title: string, message: string = '') {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'warning',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444',
    });
  }
}