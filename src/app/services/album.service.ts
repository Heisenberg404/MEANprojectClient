import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
  public url: string;

  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }


  addAlbum(token, album: Album) {
    const params = JSON.stringify(album);
    const headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : token
    });

    return this.http.post(this.url + 'album', params, {headers: headers}).map(res => res.json());
  }

  editAlbum(token, id: string, album: Album) {
    console.log(album);
    const params = JSON.stringify(album);
    const headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : token
    });

    return this.http.put(this.url + 'album/' + id, params, {headers: headers}).map(res => res.json());
  }

  getAlbum(token, id: string) {
    const headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : token
    });
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.url + 'album/' + id, options).map(res => res.json());
  }

  getAlbums(token, artistId = null) {
    const headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : token
    });
    const options = new RequestOptions({headers: headers});
    if (artistId == null) {
      return this.http.get(this.url + 'albums', options).map(res => res.json());
    } else {
      return this.http.get(this.url + 'albums/' + artistId, options).map(res => res.json());
    }

  }

  deleteAlbum(token, id: string) {
    const headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : token
    });
    const options = new RequestOptions({headers: headers});
    return this.http.delete(this.url + 'album/' + id, options).map(res => res.json());
  }
}
