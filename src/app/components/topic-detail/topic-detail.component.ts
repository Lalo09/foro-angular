import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService,UserService,CommentService]
})
export class TopicDetailComponent implements OnInit{

  public topic: any;
  public comment: any;
  public identity: any;
  public token: any
  public status:any;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('','','',this.identity._id);
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._topicService.getTopic(id).subscribe(
        response => {
          if(response.topic){
            this.topic = response.topic;
          }
          else{
            this._router.navigate(['/home'])
          }
        },error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form:any){
    this._commentService.add(this.token,this.comment,this.topic._id).subscribe(
      response=>{
        if (!response.topic) {
          this.status = 'error';
        }else{
          this.status = 'success';
          this.topic = response.topic;
          form.reset();
        }
      },error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  deleteComment(id:any){
    console.log("Delete method clicked");
    this._commentService.delete(this.token,this.topic._id,id).subscribe(
      response=>{
        if (!response.topic) {
          this.status = 'error';
        }else{
          this.status = 'success';
          this.topic = response.topic;
        }
      },error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
}
