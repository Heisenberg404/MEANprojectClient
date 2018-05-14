import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(private userService: UserService) {
    this.title = 'Update my data';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.alertMessage = 'update failed!!';
        }else {
          // this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById('identity_name').innerHTML = this.user.name;

          /*if (!this.filesToUpload) {
            this.makeFileRequest(this.url + 'upload-image-user' + this.user._id, [], this.filesToUpload ).then(
              (result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
                console.log(this.user);
              });
          }*/

          this.alertMessage = 'user updated!!';
        }
    }, error => {
        const errorMessage = <any>error;
        if (errorMessage) {
          const body = JSON.parse(error.body);
          this.alertMessage = body.message;
        }
      }
    );
  }
/*
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    const token = this.token;
    return new Promise(function (resolve, reject) {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          }else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }*/
}
