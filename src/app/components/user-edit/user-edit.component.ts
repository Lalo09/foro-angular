import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit {

  public page_title:string;
  public user:any;
  public status: any;
  public identity:any;
  public token:any;
  public afuConfig:any;
  public url: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title='Edit user';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user= this.identity;
    this.url = global.url;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg, .jpeg, .png, .gif', 
      maxSize: "50",
      uploadAPI:{
        url: global.url+"upload-avatar",
        headers:{
          "Authorization": this._userService.getToken()
        }
      },
      theme:"attachPin",
      hideProgressBar:false,
      hideResetBtn : true,
      hideSelectBtn: false,
      attachPinText: 'Upload your image',
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Upload image',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
  }
  
  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.update(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        }
        else{
          this.status = 'success';
          //Update localstorage
          localStorage.setItem('identity',JSON.stringify(this.user));
        }
      },error =>{
        this.status = 'error';
        console.log(error);
      }
    );
    console.log(this.user);
  }

  avatarUpload(data :any){
    console.log(data);
    let data_obj = JSON.parse(data.response);
    this.user.image = data_obj.user.image;
    console.log(this.user.image);
  }
}
