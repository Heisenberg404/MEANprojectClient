import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../models/artist';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {Album} from '../../models/album';
import {AlbumService} from '../../services/album.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})
export class AlbumAddComponent implements OnInit {
  public titulo: String;
  public artist: Artist;
  public album: Album
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private albumService: AlbumService) {
    this.titulo = 'Create Album';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2017, '', '');

  }

  ngOnInit() {
    console.log('album-add component init');
  }

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      const artistId = params['artist'];
      this.album.artist = artistId;

      this.albumService.addAlbum(this.token, this.album).subscribe(
        response => {
          if (!response.album) {
            this.alertMessage = 'Server error';
          } else {
            this.alertMessage = 'Album created!';
            this.album = response.album;
            this.router.navigate(['edit-album', response.album._id]);
          }

        }, error => {
          const errorMessage = <any> error;
          if (errorMessage != null) {
            const body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
    });
    console.log(this.album);
  }

}
