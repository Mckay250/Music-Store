import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TrackService } from 'src/app/services/track.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  icons = {
    close : faTimes
  }
  searchValue ='';
  songs$: Observable<[]>;
  songs;
  private searchTerms = new Subject<string>();
  exists: boolean = false;

  constructor( private trackService: TrackService,
              private router: Router) { }

  ngOnInit(): void {
    this.searchItem()
    }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  clearSearch() {
    this.songs$ = new Observable<[]>();
    this.searchValue = "";
  }

  searchItem() {
    this.songs$ = this.searchTerms.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((term: string) => this.trackService.searchTrack(term)),
    );
    this.songs$.subscribe(res => { 
      if(res.length) {
        this.exists = true;
      }
      else {
        this.exists = false;
      }
    })
  }

  searchBoxClick() {
    this.searchItem();
  }

  routeTo(trackId) {
    // this.router.navigate([`/search/${trackId}`]);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/search/${trackId}`]);
  }); 
  }

  ngOnDestroy() {
  }
}