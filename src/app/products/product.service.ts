import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyProductAPIList, Product, ProductAPIList , Cart} from '../../../projects/shared/src/lib/product.interfaces';
import { BehaviorSubject, delay, tap } from 'rxjs';

const USER_API = 'http://localhost:3000/api/product'
const PRODUCT_USER = "http://localhost:3000/api/userproducts"

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  private cartList = new BehaviorSubject<Product[]>([]);
  cartList$ = this.cartList.asObservable();

  private totalCost = new BehaviorSubject<number>(0);
  totalCost$ = this.totalCost.asObservable();

  private favouriteProducts = new BehaviorSubject<Product[]>([]);
  favouriteProducts$ = this.favouriteProducts.asObservable();

  findAll() {
    return this.http.get<ProductAPIList>(`${USER_API}/findAll`).pipe(delay(500));
  }

  insertProduct(product: Product) {
    return this.http.post<Product>(`${USER_API}/create`, product)
  }

  userProducts(username: string) {
    return this.http.get<MyProductAPIList>(`${PRODUCT_USER}/getFavourites/${username}`).pipe(
      tap((userProducts) => {
        this.favouriteProducts.next(userProducts.data.products);
      })
    );
  }

  purchase(cartList: { cartList: Product[] }, username: string) {
    return this.http.post(`${PRODUCT_USER}/buy/${username}`, cartList)
  }

  addFavourites(product: {products: Product}) {
    console.log("service product: ",product)
    return this.http.post<String>(`${PRODUCT_USER}/addToFavourites`, product)

  }

  removeFavourites(item: { product: string }, username: string) {
    const options = { body: item }; // create options object with item as body
    return this.http.delete(`${PRODUCT_USER}/removeFromFavourites/${username}`, options);
  }
  


  updateCartList(cartList: Product[]) {
    this.cartList.next(cartList);
    console.log("heyoopopp" + (this.cartList))
    
  }

  updateTotalCost( totalCost: number) {
    this.totalCost.next(totalCost);
    console.log("total cost = ", totalCost)
  }

  getTotalCost() {
    return this.totalCost$;
  }

  getCartList() {
    return  this.cartList$;
  }

  getFavourites() {
    console.log(this.favouriteProducts$);
    return this.favouriteProducts.value;
  }
}
