import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../models/artist';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {Album} from '../../models/album';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UserService, ArtistService]
})
export class AlbumAddComponent implements OnInit {
  public title: string;
  public aritst: Artist;
  public album: Album
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, artistService: ArtistService) {
    this.title = 'Create Album';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2017, '', '');

  }

  ngOnInit() {
  }

}
