import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {Album} from '../../models/album';
import {AlbumService} from '../../services/album.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UserService, AlbumService, UploadService]
})
export class AlbumEditComponent implements OnInit {
  public titulo: String;
  public album: Album
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public isEdit;
  public filesToUpload: Array<File>;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private albumService: AlbumService, private uploadService: UploadService) {
    this.titulo = 'Edit Album';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2017, '', '');
    this.isEdit = true;
  }

  ngOnInit() {
    console.log('album-edit component init');

    // get album
    this.getAlbum();
  }

  getAlbum() {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.albumService.getAlbum(this.token, id).subscribe(
        response => {
          if (!response.album) {
            this.router.navigate(['/']);
          } else {
            this.album = response.album;
          }

        }, error => {
          const errorMessage = <any> error;
          if (errorMessage != null) {
            const body = JSON.parse(error._body);
            console.log(error);
          }
        }
      );
    });
  }


  onSubmit() {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];

      this.albumService.editAlbum(this.token, id, this.album).subscribe(
        response => {
          if (!response.album) {
            this.alertMessage = 'Server error';
          } else {
            this.alertMessage = 'Album updated!';
            if (!this.filesToUpload) {
              this.router.navigate(['/artists', response.album.artist]);
            } else {
              this.uploadService.makeFileRequest(this.url + 'upload-image-album/' + id,
                [], this.filesToUpload,
                this.token, 'image').then(
                (result) => {
                  this.router.navigate(['/artists', response.album.artist]);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
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


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
