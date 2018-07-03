import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ArtistListComponent} from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import {ArtistEditComponent} from './components/artist-add/artist-edit.component';
import {ArtistDetailsComponent} from './components/artist-details/artist-details.component';
import {AlbumAddComponent} from './components/album-add/album-add.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'artists/:page', component: ArtistListComponent},
  {path: 'create-artist', component: ArtistAddComponent},
  {path: 'edit-artist/:id', component: ArtistEditComponent},
  {path: 'artist/:id', component: ArtistDetailsComponent},
  {path: 'create-album/:artist', component: AlbumAddComponent},
  {path: 'my-data', component: UserEditComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
