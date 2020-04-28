import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart= [];

  constructor() { }

  addToCart(product) {
    this.cart.push(product);
  }

  removeFromCart(product) {
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == product.id) {
        product.trackStatus = ''
        product.inCart = false;
        this.cart.splice(i, 1);
      }
    }
  }


}
