import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LenderComponent } from './home/lender.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home page
  { path: 'home', component: HomeComponent },
  { path: 'lender-select', component: LenderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
