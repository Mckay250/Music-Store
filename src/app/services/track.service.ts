import { Injectable } from '@angular/core';
import { Track } from 'src/assets/Json/Track';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  tracksUrl = 'http://localhost:8000/viewset/tracks/';
  searchUrl = 'http://localhost:8000/viewset/search/';
  previousSearchTerm: string;

  constructor( private http: HttpClient) { }

  getTracksByPage(pageNumber: number): Observable<[]> {
    return this.http.get<[]>(this.tracksUrl+`?page=${pageNumber}`);
  }
  
  getSearchTracksByPage(pageNumber: number, searchTerm: string) : Observable<[]> {
    return this.http.get<[]>(this.tracksUrl+`?page=${pageNumber}&search=${searchTerm}`);
  }

  searchTrack(searchTerm: string): Observable<[]> {
      if (!searchTerm.trim()) {
          return of([]);
      }
      else {
        this.previousSearchTerm = searchTerm;
      }
    return this.http.get<[]>(this.searchUrl+`?search=${searchTerm}`);
  }

  getSelectedSearch(id: number): Observable<{}>{
      return this.http.get<{}>(this.tracksUrl+`${id}`)
  }
}
