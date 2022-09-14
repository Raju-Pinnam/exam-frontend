import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionModel, QuestionPaper, TokenObj, UserObj } from '../models/auth.models';


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
    getSubjectWiseQuestions(data:any=null){
        let url = `${this.baseUrl}papers/questions/`
        if (data){
            if (data['subject']){
                url = `${url}?subjecct=${data['subject']}`
            }
        }
        return this.httpclient.get<QuestionModel[]>(
            `${url}`, {headers: this.response_headers}
        )
    }
    createQp(questions:string, cut_off_marks: number){
        let data = JSON.stringify({questions, cut_off_marks})
        let url = `${this.baseUrl}papers/create_testpaper/`
        return this.httpclient.post(
            `${url}`, data, {headers: this.response_headers}
        )
    }
    editingQp(data:any=null){
        let url = `${this.baseUrl}papers/questions/`
        if (data){
            if (data['subject']){
                url = `${url}?subjecct=${data['subject']}`
            }
        }
        return this.httpclient.get<QuestionModel[]>(
            `${url}`, {headers: this.response_headers}
        )
    }
    createQuestionService(question: string, answer: string, q_marks: number){
        let data = JSON.stringify({question, answer, q_marks})
        let url = `${this.baseUrl}papers/questions/`
        return this.httpclient.post(
            `${url}`, data, {headers: this.response_headers}
        )
    }
}
