import {Component, OnInit} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';
import {identity} from 'rxjs/util/identity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'MUSICAPP';
  public user: User;
  public userRegister: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log('identity');
    console.log(this.identity);
    console.log('token');
    console.log(this.token);
  }

  public onSubmit() {
    console.log(this.user);
    this.userService.signUp(this.user).subscribe(
      response => {
        console.log(response);
        const identity = response.user;
        this.identity = identity;
        if (!this.identity._id) {
          alert('user wrong');

        }else {
          // crear elemento en localstorage
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // conseguir token del usuario
          this.userService.signUp(this.user, 'true').subscribe(
            responseT => {
              console.log(responseT);
              const token = responseT.token;
              this.token = token;
              if (this.token.length <= 0) {
                alert('token not generated');

              }else {
                // crear elemento en localstorage para el token
                localStorage.setItem('token', this.token);
                console.log(this.token);
                console.log(this.identity);
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
              }
            }, error => {
              console.error(error);
              const errorMessage = <any>error;
              if (errorMessage) {
                const body = JSON.parse(error._body);
                this.errorMessage = body.message;
              }
            }
          );
        }
      },
      error => {
        console.error(error);
        const errorMessage = <any>error;
        if (errorMessage) {
          const body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  onSubmitRegister() {
    console.log('user register :: ');
    console.log(this.userRegister);
    this.userService.register(this.userRegister).subscribe(
      response => {
        const user = response.user;
        this.userRegister = user;
        if (!user._id) {
          this.alertRegister = 'error in the registre';
        }else {
          this.alertRegister = 'Registre succesfull saved, login now with: ' + this.userRegister.email;
          this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
        }

      }, error => {
        console.error(error);
        const errorMessage = <any>error;
        if (errorMessage) {
          const body = JSON.parse(error._body);
          this.alertRegister = body.message;
        }
      }
    );
  }
}
