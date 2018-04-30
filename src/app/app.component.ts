import {Component, OnInit} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'MUSICAPP';
  public user: User;
  public identity;
  public token;
  public errorMessage;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.user);
    this.userService.signUp(this.user).subscribe(
      response => {
        console.log(response);
        this.identity = response.user;
        if (!this.identity._id) {
          alert('server error');

        }else {
          // crear elemento en localstorage

          // conseguir token del usuario
          this.userService.signUp(this.user, 'true').subscribe(
            response => {
              console.log(response);
              this.token = response.token;
              if (this.token.length <= 0) {
                alert('token not generated');

              }else {
                // crear elemento en localstorage para el token
                console.log("token");
                console.log(this.token);
                console.log("identity");
                console.log(this.identity);
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
}
