import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MyProductAPIList, Product, ProductAPIList, Cart } from '../../../../projects/shared/src/lib/product.interfaces';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  
    constructor(private productService: ProductService, private service: AppService) {}

    loading = false;
    productList: Product[] = [];
    subscription: Subscription | undefined;
    cartList: Product[] = [];
    username = this.service.getLoggedInUserName();
    favourite = false;
    

    ngOnInit(): void {
        console.log('Starting "findAll" API call');
        console.log(this.username)
        this.loading = true;
        this.subscription = this.productService.findAll().subscribe({
          next: (apiData: ProductAPIList) => {
            const { status , data } = apiData;
            this.productList = data;
            console.log(status, data)
          },
          error: (error) => {
            this.loading = false;
            console.log(error);
          },
          complete: () => {
            this.loading = false;
            console.log('API call completed')
          }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    addToCart(product: Product) {
      if (this.cartList.indexOf(product) !== -1) {
        let count = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].product === product.product) {
            count++;
          }
        }
        product.quantity = count + 1;
        
      } else {
        product.quantity = 1;
        this.cartList.push(product);
      }

      console.log("my cart!!!!");
      // this.cartList.forEach(p => {
      //   console.log(`${p.product} - ${p.quantity}`);
      // });

      console.log( this.cartList);
    }

    buy() {
      console.log("my cart!", this.cartList)
      const data = {
        cartList: this.cartList
      }
      this.productService.purchase(data, this.service.getLoggedInUserName()).subscribe((response) => {
        console.log(response)
      })
      this.cartList = [];
    }


    addToFavourites(product: string) {
      console.log(product)
      this.productService.favourites(product, this.service.getLoggedInUserName()).subscribe((response) => {
        console.log(response)
      })
    }

  

  
}
