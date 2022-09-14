import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../resources/services/auth.service';
import { SubjectModel, TokenObj, UserObj } from '../resources/models/auth.models';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  is_login: boolean = true
  subjects: SubjectModel[]|any = []

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  registerForm = new FormGroup({
    username: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    contact: new FormControl(),
    email: new FormControl(),
    subject: new FormControl(),
    password: new FormControl(),
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
  async loginFormFunc(){
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
  async registrationFunc(){
    this.apiService.registerUser(this.registerForm.value).subscribe(
      result=>{
        alert("User Is registerd, Please Login");
        this.is_login = true
      },
      error => alert(error.message)
    )
  }
  redirectToPages(){
    if (this.cookieService.get('user-token')){
        this.router.navigate(['/main'])
    }
  }
  async switchToFunc(){
    this.is_login = !this.is_login
    if (this.is_login==false){
      this.apiService.subjectsList().subscribe(
        (result:SubjectModel[]|any) => {
          this.subjects = result
        },
        error => alert(error.message)
      )
    }
  }
}
