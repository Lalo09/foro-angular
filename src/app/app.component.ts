import { Component, OnInit, DoCheck } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { global } from './services/global';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Foro application with angular :v';
  public identity:any;
  public token:any;
  public url:string;
  public search: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(){
      //console.log(this.identity);
      //console.log(this.token);
  }

  //Refresh page after login
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/home']);
  }

  goSearch(){
    //alert(this.search);
    this._router.navigate(['/search',this.search]);
  }

}
