import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../services/global';
import {Song} from '../../models/song';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public url: string;
  public song;
  constructor() {
    this.url = GLOBAL.url;
    this.song = new Song(1, '', '', '', '');
  }

  ngOnInit() {
    const song = JSON.parse(localStorage.getItem('soundSong'));
    if (song) {
      this.song = song;
    } else {
      this.song = new Song(1, '', '', '', '');
    }
  }

}
