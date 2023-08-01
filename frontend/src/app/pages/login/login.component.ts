import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRequestDto } from '../../services/general.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData: any;
  isInvalid = false;
  isPending = false;
  userId = 0;
  user: UserRequestDto = {
    credentials: {
      username: '',
      password: '',
    },
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    admin: false,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(form: any) {
    this.authService.login(form.username, form.password).subscribe({
      next: (data) => {
        this.userData = JSON.parse(JSON.stringify(data));
        this.userId = this.userData.id;
        this.user.profile = this.userData.profile;
        this.user.credentials = {
          username: form.username,
          password: form.password,
        };
        this.user.admin = this.userData.admin;
        localStorage.setItem('user', JSON.stringify(this.userData));
        if (this.userData.status === 'PENDING') this.isPending = true;
        else {
          if (this.userData.admin && this.userData.companies.length > 1) {
            this.router.navigate(['/select-company']);
          } else {
            localStorage.setItem('companyId', this.userData.companies[0].id);
            localStorage.setItem(
              'companyName',
              this.userData.companies[0].name
            );
            this.router.navigate(['/']);
          }
        }
      },
      error: (e) => {
        console.error(e);
        this.isInvalid = true;
      },
    });
  }

  updatePassword(form: any) {
    const url = 'http://localhost:8080/users/' + this.userId;
    this.user.credentials.password = form.password;
    this.http.put<any>(url, this.user).subscribe({
      next: () => {
        console.log(this.user);
        if (this.user.admin && this.userData.companies.length > 1)
          this.router.navigate(['/select-company']);
        else {
          localStorage.setItem('companyId', this.userData.companies[0].id);
          localStorage.setItem('companyName', this.userData.companies[0].name);
          this.router.navigate(['/']);
        }
      },
      error: (e) => {
        console.error(e);
        this.isInvalid = true;
      },
    });
  }
}
