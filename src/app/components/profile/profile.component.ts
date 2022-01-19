import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {User} from '../../models/user';
import { global } from 'src/app/services/global';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService,TopicService]
})
export class ProfileComponent implements OnInit {

  public user: any;
  public url: string;
  public topics : any;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var userID = params['id'];
      this.getUser(userID);
      this.getTopics(userID);
    });
  }

  getUser(userID:any){
    this._userService.getUser(userID).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
        }else{
          //redirect
        }
      },error => {
        console.log(error);
      }
    );

  }

  getTopics(userID:any){
    this._topicService.getTopicsByUser(userID).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics;
        }
      },error => {
        console.log(error);
      } 
    );
  }

}
