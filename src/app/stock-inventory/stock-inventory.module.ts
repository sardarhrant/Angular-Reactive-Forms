import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { StockInventoryComponent } from './containers/stock-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockProductsComponent } from './components/stock-products/stock-products.components';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { HttpClientModule } from '@angular/common/http';
import { StockInventoryService } from './services/stock-inventory.service';
import { StockCounterComponent } from './components/stock-counter/stock-counter.component';

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockSelectorComponent,
    StockProductsComponent,
    StockBranchComponent,
    StockCounterComponent,
  ],
  providers: [StockInventoryService],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  exports: [StockInventoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StockInventoryModule {}
