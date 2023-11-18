import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    map((isAuth) => {
      if (!isAuth) {
        router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
};
