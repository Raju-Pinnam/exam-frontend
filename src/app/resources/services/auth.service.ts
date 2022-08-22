import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionPaper } from '../models/auth.models';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })
    baseUrl = "http://127.0.0.1:8500/"

    constructor(
        private httpclient: HttpClient,
        private cookieService: CookieService,
    ) { }
    
    getQuestionPapers(){
        return this.httpclient.get<QuestionPaper[]>(
            `${this.baseUrl}papers/testpapers/`, {headers: this.headers}
        )
    }

}
