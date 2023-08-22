import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Product } from '../../models/product-interface';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  templateUrl: 'stock-selector.component.html',
})
export class StockSelectorComponent {
  @Input() parent!: FormGroup;
  @Input() products!: Product[];

  @Output() added = new EventEmitter<any>();

  addStock() {
    const control = this.parent.get('selector')?.value;
    this.added.emit(control);
  }
}
