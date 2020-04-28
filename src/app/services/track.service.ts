import { Injectable } from '@angular/core';
import { Track } from 'src/assets/Json/Track';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  tracks = [
    {
        id: 1,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        id: 2,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/IMG-20171025-WA0023.jpg',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        
        id: 3,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/IMG_20141109_090419-1.jpg',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        
        id: 4,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/IMG_20181126_1257.jpg',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        
        id: 5,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x_50.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        
        id: 6,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        
        id: 7,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        
        id: 8,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 0,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        id: 9,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    },
    {
        id: 10,
        title: 'wizkid type beat',
        artwork: '../../../assets/images/sp-global-producttilev2-red.png.large.1x.png',
        audio: '../../../assets/audio/1_5010696443095154897.mp3',
        key: 'C#',
        bpm: 74,
        price: 50,
        mp3Price: 50,
        wavPrice: 65,
        inCart: false,
        trackStatus: '',
        selectedType: 'mp3'
    }
];
  url = 'http://localhost:8000/viewset/tracks/'

  constructor( private http: HttpClient) { }

  getTracksByPage(pageNumber: number): Observable<[]> {
    return this.http.get<[]>(this.url+`?page=${pageNumber}`)
    .pipe(
        tap(_ => console.log('fetched Tracks'))
    );
  }
}
