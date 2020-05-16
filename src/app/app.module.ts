import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { MinuteSecondPipePipe } from './pipes/minute-second-pipe.pipe';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TrackService } from './services/track.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BeatStoreComponent } from './components/beat-store/beat-store.component';
import { MessagesComponent } from './components/messages/messages.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './components/player/player.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FormsModule } from "@angular/forms"
import { CartService } from './services/cart.service';
import { MessageService } from './services/message.service';
import { PurchasedComponent } from './components/purchased/purchased.component';
import { PurchasedItemsService } from './services/purchased-items.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomepageComponent,
    FooterComponent,
    SearchComponent,
    MinuteSecondPipePipe,
    CartComponent,
    PageNotFoundComponent,
    BeatStoreComponent,
    MessagesComponent,
    PlayerComponent,
    SearchResultComponent,
    PurchasedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [TrackService, CartService, MessageService, PurchasedItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
