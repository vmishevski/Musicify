import { MusicComponent } from './music.component';
import { Routes } from "@angular/router";
import { AlbumComponent } from "./album/album.component";

export let MUSIC_ROUTES: Routes = [
  { path: '', component: MusicComponent, pathMatch: 'full' },
  { path: 'album/:id', component: AlbumComponent }
];

