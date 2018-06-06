import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {
  public url: string;

  constructor(private http: Http) {
    this.url = GLOBAL.url;
   }

  addArtist(token, artist: Artist) {
    const params = JSON.stringify(artist);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this.http.post(this.url + 'artist', params, {headers: headers}).map(res => res.json());
  }
}
