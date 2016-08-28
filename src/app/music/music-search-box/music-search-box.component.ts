import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit, Output, EventEmitter, ElementRef, OnDestroy} from '@angular/core';
import {Track} from "../shared/track";
import {SpotifyService} from "../shared/services/spotify.service";
import {Observable} from "rxjs";
import {ISubscription} from "rxjs/Subscription";
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'music-search-box',
  templateUrl: './music-search-box.component.html'
})
export class MusicSearchBoxComponent implements OnInit, OnDestroy  {
  query: string = '';

  private querySubscription: ISubscription;
  @Output() tracks: EventEmitter<Track[]>;
  @Output() loading: EventEmitter<boolean>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private spotifyService: SpotifyService,
              private element: ElementRef) {
    console.log('initializing search box');
    this.tracks = new EventEmitter<Track[]>();
    this.loading = new EventEmitter<boolean>();


  }

  ngOnInit() {
    //this.search(this.query);

    let params = this.activatedRoute.snapshot.params;
    this.query = params['query'] ? params['query'] : '';

    this.querySubscription = Observable.fromEvent(this.element.nativeElement, 'keyup')
      .map((element: {target: {value: string}}) => element.target.value)
      //  .merge(Observable.startWith(() => this.query))
      .do(e => console.log(e))
      .debounceTime(500)
      .do(e => console.log('keyup event:', e))
      .merge((e: string) => {
        let navigatePromise: Promise<boolean>;
        if(e){
          navigatePromise = this.router.navigate(['/music', {query: e}]);
        }else{
          navigatePromise = this.router.navigate(['/music', {}]);
        }

        let a : Promise<string> = navigatePromise.then((navigateSuccess) => e);
        return Observable.fromPromise(a);
      })
      .filter((query: string) => query.trim().length > 3)
      .do(query => this.loading.emit(true))
      .map((query: string) => this.spotifyService.findTracks(query))
      .do(q => console.log(q))
      .subscribe(
        (tracks: Track[]) => {
          this.loading.emit(false);
          this.tracks.emit(tracks);
        },
        tracks => {
          console.log('error:', tracks);
          this.loading.emit(false);
        },
        () => this.loading.emit(false));
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  search(query: string): Observable<Track[]> {
    console.log('querying for tracks with:', query);
    this.query = query;

    if (!this.query) {
      if(this.tracks){
        this.tracks.emit([]);
        this.loading.emit(false);
      }
      return;
    }

    this.loading.emit(true);
    this.spotifyService.findTracks(this.query).subscribe(tracks => {
      console.log('received tracks:', tracks);
      this.tracks.emit(tracks);
    }, error => {},
      () => this.loading.emit(false));
  }
}
