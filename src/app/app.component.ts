import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './resources/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private apiService: AuthService,
    private cookieService: CookieService,
    private router: Router
    ) { }
  userAuthenticated:boolean = false;

  ngOnInit(): void {
    this.checkLogin()
  }
  checkLogin(){
    if (this.cookieService.get('user-token')){
      this.userAuthenticated = true
    }
    else{
      this.userAuthenticated = false
    }
    return this.userAuthenticated
  }
}

