
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  signUp(userToLogin, getHash = null) {
    if (getHash !== null) {
      userToLogin.gethash = getHash;
    }
    const json = JSON.stringify(userToLogin);
    const params = json;
    const headers = new Headers({'Content-type': 'application/json'});
    return this.http.post(this.url + 'login', params, {headers: headers}).map(
      res => res.json()
    );
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined') {
      this.identity = identity;
    }else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    }else {
      this.token = null;
    }

    return this.token;
  }

  register(userToRegister) {
    const params = JSON.stringify(userToRegister);
    const headers = new Headers({'Content-type': 'application/json'});
    return this.http.post(this.url + 'register', params, {headers: headers}).map(res => res.json());
  }

  updateUser(userToUpdate) {
    const params = JSON.stringify(userToUpdate);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.url + 'update-user/' + userToUpdate._id, params, {headers: headers}).map(res => res.json());
  }

}
