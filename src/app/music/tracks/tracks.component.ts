import {Component, OnInit, Input} from '@angular/core';
import {Track} from "../shared/track";

@Component({
  selector: 'track-results',
  templateUrl: './tracks.component.html'
})
export class TracksComponent implements OnInit {
  @Input() tracks: Track[];
  @Input() loadingTracks: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
