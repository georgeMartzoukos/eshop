import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AppService } from 'src/app/app.service';
import { Product } from 'projects/shared/src/lib/product.interfaces';
import { Observable, reduce } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  
  constructor(private productService: ProductService, private service: AppService,private router: Router) {}
  cartList: Product[] = [];
  checkoutCost: number = 0;
  username = this.service.getLoggedInUserName();
  finalCheckoutAmount = this.productService.getTotalCost();


  ngOnInit(): void {
    this.productService.getCartList().subscribe((cartList: Product[]) => {
      this.cartList = cartList;
      console.log("my cart: " + JSON.stringify(this.cartList))
    });
    this.cartList.forEach(p => {this.checkoutCost += p.cost})
  }
  

  buy() {
    if (this.username) {
      console.log("my cart!", this.cartList)
      const data = {
        cartList: this.cartList
      }
      this.productService.purchase(data, this.service.getLoggedInUserName()).subscribe((response) => {
        console.log(response)
      })
      this.cartList = [];
      this.productService.updateCartList(this.cartList)
      this.router.navigate(["/product/list"])
    } else {
      this.router.navigate(["/login"])
    }
   
  }

  removeFromCart(product: Product, cost: number) {
    console.log(product)
    this.cartList = this.cartList.filter((p) => p.product !== product.product);
    console.log("here!!" +product)
    this.productService.updateCartList(this.cartList);
    this.checkoutCost -= cost;
  }

  backToProducts() {
    this.router.navigate(["/product/list"])
  }

  plusQuantity(product: string, cost: number) {
    this.cartList[this.cartList.findIndex(item => item.product === product)].quantity += 1;
    this.productService.updateCartList(this.cartList);
    this.checkoutCost += cost;
  }

  minusQuantity(product: string, cost: number) {
    this.cartList[this.cartList.findIndex(item => item.product === product)].quantity -= 1;
    this.productService.updateCartList(this.cartList);
    this.checkoutCost -= cost;
  }
}
