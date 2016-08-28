import { MusicSearchBoxComponent } from './music-search-box/music-search-box.component';
import { Component, OnInit } from '@angular/core';
import {Track} from "./shared/track";

@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  directives: [MusicSearchBoxComponent]
})
export class MusicComponent implements OnInit {
  tracks: Track[];
  loading: boolean = false;

  constructor() { }

  ngOnInit() { }
}
