import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../resources/services/auth.service';
import { TokenObj, UserObj } from '../resources/models/auth.models';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  constructor(
    private apiService: AuthService,
    private cookieService: CookieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let userToken = this.cookieService.get('user-token');
    if (userToken){
      this.router.navigate(['/main'])
    }
  }
  loginFormFunc(){
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieService.set('user-token', `Token ${result.token}`),
        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 3000)

      },
      error => console.log(error),
    )
  }
  redirectToPages(){
    if (this.cookieService.get('user-token')){
        this.router.navigate(['/main'])
    }
  }
}
