import { API_URL, AppConfig } from 'src/app/ApiUrl-injection.token';
import { CartItem, Product } from '../models/product-interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Branch } from '../models/branch-interface';
import { Inject, Injectable } from '@angular/core';

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

  getBranches(): Observable<Branch[]> {
    const apiUrl = `${this.config.apiUrl}/branches`;

    return this.http.get<Branch[]>(apiUrl);
  }

  checkBranchId(id: string): Observable<boolean> {
    const params = new HttpParams().set('id', id);

    const apiUrl = `${this.config.apiUrl}/branches`;

    return this.http.get<Branch[]>(apiUrl, { params }).pipe(
      map((response: Branch[]) => response.length > 0),
      catchError(() => EMPTY)
    );
  }
}
