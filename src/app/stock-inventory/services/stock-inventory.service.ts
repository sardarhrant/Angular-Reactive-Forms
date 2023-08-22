import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { CartItem, Product } from '../models/product-interface';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/v1/product');
  }

  getCartItems(): Observable<CartItem> {
    return this.http.get<CartItem>('/api/v1/cart').pipe(
      map((response) => response),
      catchError((error: any) => EMPTY)
    );
  }
}
