import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Artist} from '../../models/artist';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {ArtistService} from '../../services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistListComponent implements OnInit {

  public title: string;
  public artist: Artist[];
  public identity;
  public token;
  public url: string;
  public nextPage;
  public prevPage;
  public artists;
  public confirm;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private artistService: ArtistService) {
    this.title = 'Artist';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.nextPage = 1;
    this.prevPage = 1;
  }

  ngOnInit() {
    console.log('artist component init');
    this.getArtists();
  }

  getArtists() {
    this.route.params.forEach((params: Params) => {
      let page = +params['page'];
      if (!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;

        if (this.prevPage === 0) {
          this.prevPage = 1;
        }
      }
      this.artistService.getArtists(this.token, page).subscribe(
        response => {
          if (!response.artists) {
            this.router.navigate(['/']);
          } else {
            this.artists = response.artists;
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

  onDeleteConfirm(id) {
    this.confirm = id;
  }
  onCancelArtist() {
    this.confirm = null;
  }

  onDeleteArtist(id) {
    this.artistService.deleteArtist(this.token, id).subscribe(
      response => {
        if (!response.artist) {
          alert('Server Error');
        }
        this.getArtists();
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          console.log(error);
        }
      }
    );
  }


}
