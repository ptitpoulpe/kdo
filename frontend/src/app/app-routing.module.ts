import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftDetailsComponent } from './gift-details/gift-details.component';
import { GiftsComponent } from './gifts/gifts.component';
import { PersonsComponent } from './persons/persons.component';

const routes: Routes = [
  {
    path: 'gift-details',
    component: GiftDetailsComponent
  },
  {
    path: 'gifts',
    component: GiftsComponent
  },
  {
    path: 'gifts/:id',
    component: GiftDetailsComponent
  },
  {
    path: 'persons',
    component: PersonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
