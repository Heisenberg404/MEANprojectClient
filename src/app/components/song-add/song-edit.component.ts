import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Song} from '../../models/song';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {SongService} from '../../services/song.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  providers: [UserService, SongService, UploadService]
})
export class SongEditComponent implements OnInit {
  public title: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public isEdit;
  public filesToUpload;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private songService: SongService, private uploadService: UploadService) {
    this.title = 'Edit Song';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1, '', '', '', '');
    this.isEdit = true;
  }

  ngOnInit() {
    console.log('song edit component load!');
    // get song values
    this.getSong();
  }

  getSong() {
    this.route.params.forEach((params: Params) => {
      const  id = params['id'];
      this.songService.getSong(this.token, id).subscribe(
        response => {
          if (!response.song) {
            this.router.navigate(['/']);
          } else {
            this.song = response.song;
          }
        }, error => {
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
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      console.log(this.song);

      this.songService.editSong(this.token, id, this.song).subscribe(
        response => {
          if (!response.song) {
            this.alertMessage = 'Server error';
          } else {
            this.alertMessage = 'edited';
            if (!this.filesToUpload) {
              this.router.navigate(['/album', response.song.album]);
            } else {
              // upload file
              this.uploadService.makeFileRequest(this.url + 'upload-file-song/' + id,
                [], this.filesToUpload,
                this.token, 'file').then(
                (result) => {
                  this.router.navigate(['/album', response.song.album]);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          }
        }, error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            const body = JSON.parse(error._body);
            console.log(error);
          }
        }
      );
    });

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

}
