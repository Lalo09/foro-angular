import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Topic } from "../models/topic";
import { global } from "./global";


@Injectable()
export class TopicService{

    public url: string;
    public identity:any;
    public token:any;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Test topic service :v";
    }

    addTopic(topic:any,token:any): Observable<any>{
        //Convert obj to json string
        let params = JSON.stringify(topic);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        //Request
        return this._http.post(this.url+'topic',params,{headers:headers});
    }

    getTopicsByUser(userID:any):Observable<any>{        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'user-topics/'+userID,{headers:headers});
    }

    getTopic(id:any):Observable<any>{
        return this._http.get(this.url+'topic/'+id);
    }

    update(topic:any,token:any, id: any): Observable<any>{
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.put(this.url+'topic/'+id,params,{headers:headers});
    }

    delete(token:any, id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.delete(this.url+'topic/'+id,{headers:headers});
    }

    getTopics(page:any=1):Observable<any>{
        return this._http.get(this.url+'topics/'+page);
    }

    search(searchString:string):Observable<any>{
        return this._http.get(this.url+'search/'+searchString);
    }

}