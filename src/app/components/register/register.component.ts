import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {

  public page_title:string;
  public user:any;
  public status: any;

  constructor(
    private _userService: UserService
  ) {
    this.page_title='Register now'
    this.user= new User('','','','','','','ROLE_USER');
   }

  ngOnInit(): void {
    console.log(this._userService.test());
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
            this.status = 'success';
            form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
