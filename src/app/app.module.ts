import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, StockInventoryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
