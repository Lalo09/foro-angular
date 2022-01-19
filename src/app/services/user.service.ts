import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService{

    public url: string;
    public identity:any;
    public token:any;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Test user service :v";
    }

    register(user:any): Observable<any>{
        //Convert obj to json string
        let params = JSON.stringify(user);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type','application/json');

        //Request
        return this._http.post(this.url+'register',params,{headers:headers});
    }

    signup(user:any ,getttoken = null):Observable<any>{
        //Check if gettoken exists
        if (getttoken != null) {
            user.gettoken = getttoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'login',params,{headers:headers});
    }

    //Get info from localstorage
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')|| '{}');

        if (identity && identity != null && identity != undefined  && identity != "undefined") {
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if (token && token != null && token != undefined  && token != "undefined") {
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    update(user:any):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());

        return this._http.put(this.url+'update',params,{headers:headers});
    }

    getUsers():Observable<any>{
        return this._http.get(this.url+'users');
    }

    getUser(userId:any):Observable<any>{
        return this._http.get(this.url+'user/'+userId);
    }
}
