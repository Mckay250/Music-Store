import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart= [];

  constructor( private messageService: MessageService) { }

  addToCart(product) {
    this.cart.push(product);
    this.messageService.add('Track has been added to cart')
  }

  removeFromCart(product) {
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == product.id) {
        product.trackStatus = ''
        product.inCart = false;
        this.cart.splice(i, 1);
        this.messageService.add('Track has been removed from cart')
      }
    }
  }


}
