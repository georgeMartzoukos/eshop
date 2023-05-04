import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyProductAPIList, Product, ProductAPIList , Cart} from '../../../projects/shared/src/lib/product.interfaces';
import { BehaviorSubject, delay } from 'rxjs';

const USER_API = 'http://localhost:3000/api/product'
const PRODUCT_USER = "http://localhost:3000/api/userproducts"

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  private cartList = new BehaviorSubject<Product[]>([]);
  cartList$ = this.cartList.asObservable();

  findAll() {
    return this.http.get<ProductAPIList>(`${USER_API}/findAll`).pipe(delay(500));
  }

  insertProduct(product: Product) {
    return this.http.post<Product>(`${USER_API}/create`, product)
  }

  userProducts(username: string) {
    return this.http.get<MyProductAPIList>(`${PRODUCT_USER}/findOne/${username}`)
  }

  purchase(cartList: { cartList: Product[] }, username: string) {
    return this.http.post(`${PRODUCT_USER}/buy/${username}`, cartList)
  }

  favourites(product: string, username: string) {
    console.log("service product: ",product)
    return this.http.post<String>(`${PRODUCT_USER}/create/${username}`, product)

  }


  updateCartList(cartList: Product[]) {
    this.cartList.next(cartList);
    console.log("heyoopopp" + (this.cartList))
    
  }

  getCartList() {
    return  this.cartList$;
  }
}
