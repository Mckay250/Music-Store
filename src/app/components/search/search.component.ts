import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  songs$: Observable<[]>;
  private searchTerms = new Subject<string>();
  constructor() { }

  ngOnInit(): void {
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }
}
