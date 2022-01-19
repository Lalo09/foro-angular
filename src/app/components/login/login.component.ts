import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  
  public page_title:string;
  public user: any;
  public status: any;
  public identity: any;
  public token: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = 'Login!';
    this.user= new User('','','','','','','ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    //console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          //Save user info
          this.identity = response.user;

          //Localstorage
          localStorage.setItem('identity',JSON.stringify(this.identity));

          //Get token 
          this._userService.signup(this.user,this.status).subscribe(
            response => {
              if (response.token) {
                
                console.log(response);    
                
                //Save token
                this.token = response.token;
                localStorage.setItem('token',this.token);

                this.status = 'success';
                this._router.navigate(['/home']);

              }else{
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        }else{
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
