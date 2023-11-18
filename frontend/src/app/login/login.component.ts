import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  onSubmit(form: NgForm) {
    const { username } = form.value;
    this.authService.login(username).subscribe({
      next: () => console.log('next'),
      complete: () => this.router.navigateByUrl(''),
      error: (err) => console.log(err),
    });
  }
}
