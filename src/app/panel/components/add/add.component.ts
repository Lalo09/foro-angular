import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers:[UserService,TopicService]
})
export class AddComponent implements OnInit {
  public page_title: string;
  public topic: any;
  public identity: any;
  public token: any;
  public status: any;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Create new topic';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
    this.is_edit = false;
   }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    //console.log(this.topic);
    console.log(this._topicService.test());
    this._topicService.addTopic(this.topic,this.token).subscribe(
      response => {
        if (response.topic) {
          this.status = 'success';
          this.topic = response.topic;
          this._router.navigate(['/panel']);
        }
        else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
