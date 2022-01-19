import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[UserService,TopicService]
})
export class ListComponent implements OnInit {
  public page_title: string;
  public topics: any;
  public identity: any;
  public token: any;
  public status: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'List all topics';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

   ngOnInit(): void {
     this.getTopics();
  }

  getTopics(){
    var userId = this.identity._id;
    //console.log("user:"+userId);
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        //console.log("response::: ... "+response);
        if (response.topics) {
          this.topics = response.topics;
        }
      },error => {
        this.status = 'error';
        console.log(error);
      } 
    );
  }

  deleteTopic(id:any){
    console.log("El que se desea borrar es: "+id);
    this._topicService.delete(this.token,id).subscribe(
      response => {
        this.getTopics();
      },error=>{
        console.log(error);
      }
    );
}
}
