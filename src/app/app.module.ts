import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {appRoutingProviders, routing} from './app.routing';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import {ArtistEditComponent} from './components/artist-add/artist-edit.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';
import { ReplacePipePipe } from './pipes/replace-pipe.pipe';
import {AlbumEditComponent} from './components/album-add/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { SongAddComponent } from './components/song-add/song-add.component';
import {SongEditComponent} from './components/song-add/song-edit.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailsComponent,
    AlbumAddComponent,
    ReplacePipePipe,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
