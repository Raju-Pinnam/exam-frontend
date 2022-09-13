import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionPaper, TokenObj, UserObj } from '../models/auth.models';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })
    token = this.cookieService.get('user-token')

    response_headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.token}`
    })
    baseUrl = "http://127.0.0.1:8500/"

    constructor(
        private httpclient: HttpClient,
        private cookieService: CookieService,
    ) { }
    
    getQuestionPapers(data:any=null){
        let url = `${this.baseUrl}papers/testpapers/`
        if (data){
            if (data['is_sent_checker'] == true){
                url = `${url}?is_sent_checker=true`
            }
            if (data['is_sent_examiner'] == true){
                url = `${url}?is_sent_examiner=true`
            }
        }
        return this.httpclient.get<QuestionPaper[]>(
            `${url}`, {headers: this.response_headers}
        )
    }
    loginUser(authData:any){
        const body = JSON.stringify(authData);
        return this.httpclient.post<TokenObj>(
            `${this.baseUrl}auth-token/`, body, {headers: this.headers}
        )
    }
    getUserDetails(){
        return this.httpclient.get<UserObj>(
            `${this.baseUrl}papers/user_details/`, {headers: this.response_headers}
        )
    }
}
