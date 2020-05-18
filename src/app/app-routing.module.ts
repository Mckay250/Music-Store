import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BeatStoreComponent } from './components/beat-store/beat-store.component';
import { PlayerComponent } from './components/player/player.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PurchasedComponent } from './components/purchased/purchased.component';


const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'store', component: BeatStoreComponent},
  {path: 'purchase', component: PurchasedComponent},
  {path: 'search/:id', component: SearchResultComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
