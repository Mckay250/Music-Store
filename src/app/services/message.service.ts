import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string= '';
  showMessage = false;

  constructor() { }

  add(message: string) {
    this.message = message;
    this.showMessage = true;
    setTimeout(() => {this.showMessage = false}, 1500);
  }

  clear() {
    this.message = '';
    this.showMessage = false;
  }
}
