import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { PurchasedItemsService } from 'src/app/services/purchased-items.service';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('paypal', { static: true }) 
  paypalElement: ElementRef;

  email;
  icons = {
    paypal : faPaypal,
    remove : faTrash
  }
  cartItems = [];
  totalGross = 0;

  constructor( private cartService: CartService,
               private purchaseService: PurchasedItemsService,
               private router: Router ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cart;
    this.gross();
    paypal
      .Buttons({
        style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'checkout',          
      },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Beat(s) payment',
                amount: {
                  currency_code: 'USD',
                  value: this.totalGross
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(this.email);
          console.log(this.cartItems);
          console.log(order);
          this.purchaseService.purchased = this.cartItems;
          this.router.navigate(['/purchase']);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
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
        this.cartItems[i].selected_type = 'wav';
        this.cartItems[i].price = item.wav_price;
        this.gross()
      }
    }
  }

  mp3PriceChange(item) {
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == item.id) {
        this.cartItems[i].selected_type = 'mp3';
        this.cartItems[i].price = item.mp3_price;
        this.gross()
      }
    } 
  }

}
