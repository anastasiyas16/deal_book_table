import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LenderComponent } from './home/lender.component';
import { PrimaryService } from './home/primary.service';

import {CategoryPipe} from './components/category.pipe';
import {OrderrByPipe} from './components/orderby.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LenderComponent,
    CategoryPipe,
    OrderrByPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PrimaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
