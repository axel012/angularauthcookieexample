import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, skip } from 'rxjs';

const API_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private user = new BehaviorSubject<{ name: string } | null>(null);

  user$ = this.user.asObservable();
  isAuth$: Observable<boolean> = this.user
    .asObservable()
    .pipe(skip(1))
    .pipe(map((user) => !!user));

  login(name: string) {
    return this.http.post(
      `${API_URL}/auth`,
      { name },
    );
  }
  checkAuth() {
    this.http.get(`${API_URL}/home`).subscribe({
      next: (user: any) => this.user.next(user),
      error: () => this.user.next(null),
    });
    return this.isAuth$;
  }
}
