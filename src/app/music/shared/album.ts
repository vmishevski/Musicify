export class Album {
  artists: [{
    id: string;
    name: string;
  }];
  name: string;
  popularity: number;
  release_date: string;
  tracks: {
    items: [{
      id: string;
      name: string;
      preview_url: string;
      track_number: number;
    }];
  };
}
