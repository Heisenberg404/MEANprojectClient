import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Song} from '../models/song';
import {GLOBAL} from './global';

@Injectable()
export class SongService {

  public url: string;
  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  addSong(token, song: Song) {
    const params = JSON.stringify(song);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : token
    });

    return this.http.post(this.url + 'song', params, {headers: headers}).map(res => res.json());
  }

  getSong(token, id: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : token
    });
    const options = new RequestOptions({headers});
    return this.http.get(this.url + 'song/' + id, options).map(res => res.json());
  }

  getSongs(token, albumId = null) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : token
    });
    const options = new RequestOptions({headers});
    if (albumId == null) {
      return this.http.get(this.url + 'songs/', options).map(res => res.json());
    } else {
      return this.http.get(this.url + 'songs/' + albumId, options).map(res => res.json());
    }
  }

  editSong(token, id: string, song: Song) {
    const params = JSON.stringify(song);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : token
    });

    return this.http.put(this.url + 'song/' + id, params, {headers: headers}).map(res => res.json());
  }

  deleteSong(token, id: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : token
    });
    const options = new RequestOptions({headers});
    return this.http.delete(this.url + 'song/' + id, options).map(res => res.json());
  }

}
