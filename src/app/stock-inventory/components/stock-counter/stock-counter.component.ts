import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true,
};

@Component({
  selector: 'stock-counter',
  templateUrl: 'stock-counter.component.html',
  styleUrls: ['stock-counter.component.scss'],
  providers: [COUNTER_CONTROL_ACCESSOR],
})
export class StockCounterComponent implements ControlValueAccessor {
  writeValue(value: any): void {
    this.value = value || 0;
  }

  private onTouch!: Function;
  private onModelChange!: Function;

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  @Input()
  step = 10;

  @Input()
  min = 10;

  @Input()
  max = 1000;

  value = 10;
  focus!: boolean;

  onKeyDown(event: KeyboardEvent) {
    const handlers: { [key: string]: () => void } = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment(),
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
