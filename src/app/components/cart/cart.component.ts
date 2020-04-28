import { Component, OnInit } from '@angular/core';

import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  icons = {
    paypal : faPaypal,
    remove : faTrash
  }
  cartItems = [];
  totalGross = 0;

  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cart;
    this.gross();
  }

  removeItem(item) {
    this.cartService.removeFromCart(item);
    this.gross()
  }

  gross() {
    this.totalGross = 0;
    for (let i of this.cartItems) {
      this.totalGross += i.price;
    }
  }
    
  wavPriceChange(item) {
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == item.id) {
        this.cartItems[i].selectedType = 'wav';
        this.cartItems[i].price = item.wavPrice;
        this.gross()
      }
    }
  }

  mp3PriceChange(item) {
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == item.id) {
        this.cartItems[i].selectedType = 'mp3';
        this.cartItems[i].price = item.mp3Price;
        this.gross()
      }
    } 
  }
  // priceChange(item) {
  //   if (item.selectedType === 'mp3') {
  //     for (var i = 0; i < this.cartItems.length; i++) {
  //       if (this.cartItems[i].id == item.id) {
  //         this.cartItems[i].selectedType = 'wav';
  //         this.cartItems[i].price = item.wavPrice;
  //         console.log(this.cartItems[i].selectedType + this.cartItems[i].price)
  //       }
  //     }
  //   console.log('done1')
  //   }
  //   else {
  //     for (var i = 0; i < this.cartItems.length; i++) {
  //       if (this.cartItems[i].id == item.id) {
  //         this.cartItems[i].selectedType = 'mp3';
  //         this.cartItems[i].price = item.mp3Price;
  //         console.log(this.cartItems[i].selectedType + this.cartItems[i].price)
  //       }
  //     } 
  //   console.log('done2')
  //   }
  //   console.log('finally done')
  // }

}
