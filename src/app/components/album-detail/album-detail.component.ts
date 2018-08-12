import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../models/album';
import {GLOBAL} from '../../services/global';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SongService} from '../../services/song.service';
import {Song} from '../../models/song';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  providers: [UserService, AlbumService, SongService]
})
export class AlbumDetailComponent implements OnInit {
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public album: Album;
  public songs: Song[];
  public confirm;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private albumService: AlbumService, private songService: SongService) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('AlbumDetailComponent load!');
    this.getAlbum();
  }

  getAlbum() {
    console.log('works!');
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.albumService.getAlbum(this.token, id).subscribe(
        res => {
          if (!res.album) {
            this.router.navigate(['/']);
          } else {
            this.album = res.album;
            // get song for album
            this.songService.getSongs(this.token, res.album._id).subscribe(
              response => {
                if (!response.songs) {
                  this.alertMessage = 'Error: not songs found';
                }else {
                  this.songs = response.songs;
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

  onDeleteConfirm(id) {
    this.confirm = id;
  }

  onCancelSong() {
    this.confirm = null;
  }

  onDeleteSong(id) {
    this.songService.deleteSong(this.token, id).subscribe(
      response => {
        if (!response.song){
          alert('server errror');
        }
        this.getAlbum();
      }, error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          console.log(error);
        }
      }
    );
  }

  startPlayer(song) {
    const songPlayer = JSON.stringify(song);
    const filePath = this.url + 'get-song-file/' + song.file;
    const imagePath = this.url + 'get-image-album/' + song.album.image;
    localStorage.setItem('soundSong', songPlayer);
    document.getElementById('mp3-source').setAttribute('src', filePath);
    (document.getElementById("player") as any).load();
    (document.getElementById("player") as any).play();
    document.getElementById('play-song-title').innerHTML = song.name;
    document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
    document.getElementById('play-image-album').setAttribute('src', imagePath);
  }
}
