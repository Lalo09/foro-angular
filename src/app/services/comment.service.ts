import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Topic } from "../models/topic";
import { global } from "./global";


@Injectable()
export class CommentService{

    public url: string;
    public identity:any;
    public token:any;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }


    add(token:any,comment:any,topicid:any): Observable<any>{
        //Convert obj to json string
        let params = JSON.stringify(comment);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        //Request
        return this._http.post(this.url+'comment/topic/'+topicid,params,{headers:headers});
    }

    delete(token:any, idTopic: any, idComment: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.delete(this.url+'comment/'+idTopic+'/'+idComment,{headers:headers});
    }

}