import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MyProductAPIList, Product, ProductAPIList, Cart } from '../../../../projects/shared/src/lib/product.interfaces';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    
  
    constructor(private productService: ProductService, private service: AppService, private router: Router) {}

    loading = false;
    productList: Product[] = [];
    subscription: Subscription | undefined;
    cartList: Product[] = [];
    username = this.service.getLoggedInUserName();
    favourite = false;
    totalCost: number = 0
    
    

    ngOnInit(): void {
      this.productService.getCartList().subscribe((cartList: Product[]) => {
        this.cartList = cartList;
        console.log("but why?" + JSON.stringify(this.cartList))
      });

      this.productService.getTotalCost().subscribe((totalCost: number) => {
        this.totalCost  = totalCost;
      })

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
      this.productService.updateCartList(this.cartList)
      // this.productService.updateTotalCost(this.costSum())
    }

    checkout() {   
      this.router.navigate(["product/my-cart"]);
    }


    addToFavourites(product: string) {
      console.log(product)
      this.productService.favourites(product, this.service.getLoggedInUserName()).subscribe((response) => {
        console.log(response)
      })
    }

    // costSum() {
    //   return this.cartList.reduce((acc, cur) => acc + cur.cost * cur.quantity, 0)
    // }

  
}
