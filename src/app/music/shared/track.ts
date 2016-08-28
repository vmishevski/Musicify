export class Track {
  album: {
    id: string;
    name: string;
    images: [{
      url: string;
    }]
  };
  artists: [{
    id: string;
    name: string;
  }];
  popularity: number;
  preview_url: string;
}
