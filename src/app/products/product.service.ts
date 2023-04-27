import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductAPIList } from '../../../projects/shared/src/lib/product.interfaces';
import { delay } from 'rxjs';

const USER_API = 'http://localhost:3000/api/product'

@Injectable()
export class ProductService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<ProductAPIList>(`${USER_API}/findAll`).pipe(delay(500));
  }

  insertProduct(product: Product) {
    return this.http.post<Product>(`${USER_API}/create`, product)
  }

  userProducts(username: string) {
    return this.http.get<ProductAPIList>(`${USER_API}/findOne/${username}`)
  }
}
