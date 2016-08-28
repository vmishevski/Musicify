import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Track} from "../track";
import {Http, Response} from "@angular/http";
import {Album} from "../album";

@Injectable()
export class SpotifyService {
  private spotifyUrl = 'https://api.spotify.com';
  constructor(private http: Http) { }

  findTracks(query: string): Observable<Track[]> {
    return this.http.get(`${this.spotifyUrl}/v1/search?q=${query}&type=track`)
      .map((response: Response) => {
        let r = response.json();

        return <Track[]>r.tracks.items;
      });
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get(`${this.spotifyUrl}/v1/albums/${id}`)
      .map((response: Response) => {
        return <Album>response.json();
    });
  }
}
