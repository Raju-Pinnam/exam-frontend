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
    getResponseHeaders(){
        let token = this.cookieService.get('user-token')
        if (token){
            return new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `${token}`
            })
        }
        else{
            return new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('user-token')}`
            })
        }
    }
    getUserType(){
        let userType = this.cookieService.get('user-type')
        if (userType){
            return userType
        }
        else{
            return localStorage.getItem('user-type')
        }
    }
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
            `${url}`, {headers: this.getResponseHeaders()}
        )
    }
    loginUser(authData:any){
        const body = JSON.stringify(authData);
        return this.httpclient.post<TokenObj>(
            `${this.baseUrl}auth-token/`, body, {headers: this.headers}
        )
    }
    registerUser(registerData:any){
        const body=JSON.stringify(registerData);
        return this.httpclient.post(
            `${this.baseUrl}papers/register/`, body, {headers: this.headers}
        )
    }
    getUserDetails(){

        let data = this.httpclient.get<UserObj>(
            `${this.baseUrl}papers/user_details/`, {headers: this.getResponseHeaders()}
        )
        console.log(data)
        return data
    }
    getSubjectWiseQuestions(data:any=null){
        let url = `${this.baseUrl}papers/questions/`
        if (data){
            if ('subject' in data){
                url = `${url}?subject=${data['subject']}`
                
            }
        }
        return this.httpclient.get<QuestionModel[]>(
            `${url}`, {headers: this.getResponseHeaders()}
        )
    }
    createQp(questions:string, cut_off_marks: number){
        let data = JSON.stringify({questions, cut_off_marks})
        let url = `${this.baseUrl}papers/create_testpaper/`
        return this.httpclient.post(
            `${url}`, data, {headers: this.getResponseHeaders()}
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
            `${url}`, {headers: this.getResponseHeaders()}
        )
    }
    createQuestionService(question: string, answer: string, q_marks: number){
        let data = JSON.stringify({question, answer, q_marks})
        let url = `${this.baseUrl}papers/questions/`
        return this.httpclient.post(
            `${url}`, data, {headers: this.getResponseHeaders()}
        )
    }
    subjectsList(){
        return this.httpclient.get(
            `${this.baseUrl}papers/subjects/`, {headers: this.headers}
        )
    }
    sendToCheckerApprovalService(testpaper_id:number){
        let data = JSON.stringify({testpaper_id})
        return this.httpclient.post(
            `${this.baseUrl}papers/test_papers_list_checker/`, data, {headers: this.getResponseHeaders()}
        )
    }
    getSentToVeerificationPapersService(profile_ch:string){
        let url = `${this.baseUrl}papers/test_papers_list/sent/to/verify/?profile_ch=${profile_ch}`
        return this.httpclient.get<QuestionPaper[]>(
            url, {headers: this.getResponseHeaders()}
        )
    }

    getValidatedPapersService(profile_ch:string){
        let url = `${this.baseUrl}papers/test_paper/accepted/list/?profile_ch=${profile_ch}&is_verified=true`
        return this.httpclient.get<QuestionPaper[]>(
            url, {headers: this.getResponseHeaders()}
        )
    }

    getVerificationAcceptedPapersService(profile_ch:string){
        let url = `${this.baseUrl}papers/test_paper/accepted/list/?profile_ch=${profile_ch}`
        return this.httpclient.get<QuestionPaper[]>(
            url, {headers: this.getResponseHeaders()}
        )
    }
    acceptingQPForVerifyFuncService(qp_id:number){
        let userType = this.getUserType()
        let url = `${this.baseUrl}papers/checker_test_approval/?testpaper_id=${qp_id}&user_type=${userType}`
        return this.httpclient.get(
            url, {headers: this.getResponseHeaders()}
        )
    }
    verifyingQpFuncService(data:any){
        data = JSON.stringify(data)
        let url = `${this.baseUrl}papers/checker_test_approval/`
        return this.httpclient.post(
            url, data, {headers:this.getResponseHeaders()}
        )
    }
    deleteTestPaper(qpId:number){
        return this.httpclient.delete(
            `${this.baseUrl}papers/create_testpaper/?pk=${qpId}`, 
            {headers:this.getResponseHeaders()}
        )
    }
}
