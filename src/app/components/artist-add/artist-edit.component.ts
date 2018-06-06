import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistEditComponent implements OnInit {
  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private userService: UserService, private artistService: ArtistService) {
    this.title = 'Add artist';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
    this.is_edit = true;
   }

  ngOnInit() {
    console.log('artist edit loaded');
    // Llamar api para obtener aritsta por id
  }

  onSubmit() {
    console.log(this.artist);
    this.artistService.addArtist(this.token, this.artist).subscribe(
      response => {
        if (!response.artist) {
          this.alertMessage = 'Error';
          alert('server error');
        }else {
          this.alertMessage = 'Artist saved';
          this.artist = response.artist;
          // this.router.navigate([]);
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
      }
    );
  }

}
