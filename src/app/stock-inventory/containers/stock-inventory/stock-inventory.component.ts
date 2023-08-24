import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Product } from '../../models/product-interface';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { forkJoin } from 'rxjs';
import { StockValidators } from './stock-inventory.validators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  templateUrl: 'stock-inventory.component.html',
})
export class StockInventoryComponent implements OnInit {
  data: any;
  products!: Product[];
  productMap!: Map<number, Product>;
  form = this.fb.group(
    {
      store: this.fb.group({
        branch: [
          '',
          [Validators.required, StockValidators.checkBranch],
          [this.validateBranch.bind(this)],
        ],
        code: ['', [Validators.required, StockValidators.checkCode]],
      }),
      selector: this.createStock({}),
      stock: this.fb.array([]),
    },
    { validator: StockValidators.checkStockExists }
  );

  constructor(
    private fb: FormBuilder,
    private stockInventoryService: StockInventoryService
  ) {}

  ngOnInit(): void {
    const cart = this.stockInventoryService.getCartItems();
    const products = this.stockInventoryService.getProducts();

    forkJoin({
      cart: this.stockInventoryService.getCartItems(),
      products: this.stockInventoryService.getProducts(),
      branches: this.stockInventoryService.getBranches(),
    }).subscribe(({ cart, products, branches }: any) => {
      this.data = { cart, products, branches };
      const myMap = products.map((product: any) => {
        return [product.id, product, branches];
      });

      this.productMap = new Map<number, Product>(myMap);
      this.products = products;

      cart.forEach((item: any) => this.addStock(item));
    });
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

  validateBranch(control: AbstractControl) {
    return this.stockInventoryService.checkBranchId(control.value).pipe(
      map((response) => {
        console.log(response);
        return response ? null : { unknownBranch: true };
      })
    );
  }

  removeStock({ group, index }: { group: FormGroup; index: number }) {
    const stocks = this.form.get('stock') as FormArray;
    stocks.removeAt(index);
  }
}
