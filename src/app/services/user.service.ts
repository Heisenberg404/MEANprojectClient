
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  public url: string;

  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  signUp(userToLogin, getHash = null) {
    if (getHash != null) {
      userToLogin.gethash = getHash;
    }
    const json = JSON.stringify(userToLogin);
    const params = json;
    const headers = new Headers({'Content-type': 'application/json'});
    return this.http.post(this.url + 'login', params, {headers: headers}).map(
      res => res.json()
    );
  }

}
