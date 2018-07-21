import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Song} from '../../models/song';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  providers: [UserService]
})
export class SongAddComponent implements OnInit {
  public title: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.title = 'Add new Song';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1, '', '', '', '');
  }

  ngOnInit() {
    console.log('song add component load!');
  }

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      const albumId = params['album'];
      this.song.album = albumId;
      console.log(this.song);
    });

  }

}
