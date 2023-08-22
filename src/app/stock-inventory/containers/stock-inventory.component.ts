import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Product, CartItem } from '../models/product-interface';
import { StockInventoryService } from '../services/stock-inventory.service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  templateUrl: 'stock-inventory.component.html',
})
export class StockInventoryComponent implements OnInit {
  products!: Product[];
  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: '',
    }),
    selector: this.createStock({}),
    stock: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private stockInventoryService: StockInventoryService
  ) {}

  ngOnInit(): void {
    const cart = this.stockInventoryService.getCartItems();
    const products = this.stockInventoryService.getProducts();

    const data = forkJoin({
      cart: this.stockInventoryService.getCartItems(),
      products: this.stockInventoryService.getProducts(),
    }).subscribe(console.log);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  createStock(stock: any) {
    return this.fb.group({
      product_id: new FormControl(parseInt(stock.product_id, 10) || ''),
      quantity: new FormControl(stock.quantity || 20),
    });
  }

  addStock(stock: any) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup; index: number }) {
    const stocks = this.form.get('stock') as FormArray;
    stocks.removeAt(index);
  }
}
