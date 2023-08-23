import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Product } from '../../models/product-interface';

@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  templateUrl: 'stock-products.component.html',
})
export class StockProductsComponent {
  @Input()
  parent!: FormGroup;

  @Input()
  map!: Map<number, Product>;

  @Output()
  removed = new EventEmitter<any>();

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }

  getProduct(id: any) {
    return this.map.get(id);
  }

  removeItem(group: any, index: number) {
    this.removed.emit({ group, index });
  }
}
