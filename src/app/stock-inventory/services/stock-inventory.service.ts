import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { CartItem, Product } from '../models/product-interface';
import { API_URL, AppConfig } from 'src/app/ApiUrl-injection.token';

@Injectable()
export class StockInventoryService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private config: AppConfig
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.apiUrl}/products`);
  }

  getCartItems(): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.config.apiUrl}/cart`).pipe(
      map((response) => response),
      catchError((error: any) => EMPTY)
    );
  }
}
