import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Artist} from '../../models/artist';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService]
})
export class ArtistListComponent implements OnInit {

  public title: string;
  public artist: Artist[];
  public identity;
  public token;
  public url: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.title = 'Artist';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('artist component init');
  }
}
