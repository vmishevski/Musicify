import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../shared/services/spotify.service";
import {Album} from "../shared/album";

@Component({
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  album: Album;

  constructor(private route: ActivatedRoute,
              private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.spotifyService.getAlbum(id)
      .subscribe((album: Album) => this.album = album);
  }
}
