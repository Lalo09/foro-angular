import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public page_title: string;
  public topics: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) { 
    this.page_title= 'Search result';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      var search = params['search'];

      this.page_title= 'Search result: '+search;
      this.getTopics(search);
    });    
  }

  getTopics(search:any){
    this._topicService.search(search).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
        }
      },error => {
        console.log(error);
      }
    );
  }
}
