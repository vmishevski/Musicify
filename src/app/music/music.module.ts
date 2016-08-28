import { NgModule } from '@angular/core';

import { MusicComponent }   from './music.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MUSIC_ROUTES} from "./music.router";
import {MusicSearchBoxComponent} from "./music-search-box/music-search-box.component";
import {SpotifyService} from "./shared/services/spotify.service";
import {TracksComponent} from "./tracks/tracks.component";
import {AlbumComponent} from "./album/album.component";
import {RouterModule} from "@angular/router";

console.log('`MusicModule` loaded');

@NgModule({
  imports: [CommonModule, RouterModule.forChild(MUSIC_ROUTES)],
  exports: [],
  declarations: [MusicComponent, MusicSearchBoxComponent, TracksComponent, AlbumComponent],
  providers: [SpotifyService],
})
export default class MusicModule { }
