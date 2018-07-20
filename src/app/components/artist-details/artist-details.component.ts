import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../models/artist';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../models/album';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})
export class ArtistDetailsComponent implements OnInit {

  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public albums: Album[];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
                private artistService: ArtistService, private albumService: AlbumService) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getArtist();
  }

  getArtist() {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.artistService.getArtist(this.token, id).subscribe(
        response => {
          if (!response.artist) {
            this.router.navigate(['/']);
          } else {
            this.artist = response.artist;
            this.albumService.getAlbums(this.token, response.artist._id).subscribe(
              res => {
                if (!res.albums) {
                  this.alertMessage = 'Albums not found';
                } else {
                  this.albums = res.albums;
                }
              }, error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                  const body = JSON.parse(error._body);
                  console.log(error);
                }
              }
            );
          }
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            const body = JSON.parse(error._body);
            console.log(error);
          }
        }
      );
    });
  }
}
