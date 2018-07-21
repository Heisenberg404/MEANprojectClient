import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../models/album';
import {GLOBAL} from '../../services/global';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  providers: [UserService, AlbumService]
})
export class AlbumDetailComponent implements OnInit {
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public album: Album;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private albumService: AlbumService) {
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
}
