import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Artist} from '../../models/artist';
import {GLOBAL} from '../../services/global';
import {ArtistService} from '../../services/artist.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService, ArtistService, UploadService]
})
export class ArtistEditComponent implements OnInit {
  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  public filesToUpload: Array<File>;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private artistService: ArtistService, private uploadService: UploadService) {
    this.title = 'Edit artist';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
    this.is_edit = true;
  }

  ngOnInit() {
    console.log('artist edit loaded');
    // Llamar api para obtener aritsta por id
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

  onSubmit() {
    console.log(this.artist);
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.artistService.editArtist(this.token, id, this.artist).subscribe(
        response => {
          if (!response.artist) {
            this.alertMessage = 'Error';
            alert('server error');
          } else {
            this.alertMessage = 'Artist updated';
            this.uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id,
              [], this.filesToUpload,
              this.token, 'image').then(
              (result) => {
                this.router.navigate(['/artists', 1]);
              },
              (error) => {
                console.log(error);
              }
            );
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
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
