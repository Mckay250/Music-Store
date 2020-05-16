import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchasedItemsService {

  purchased = [];

  constructor() { }
}
