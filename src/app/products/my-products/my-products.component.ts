import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyProductAPIList, Product, ProductAPIList } from 'projects/shared/src/lib/product.interfaces';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnDestroy, OnInit {
  constructor(private productService: ProductService, private service: AppService) {}

  loadingP = false;
  myProductsList: Product[] = [];
  subscription: Subscription | undefined;
  username = this.service.getLoggedInUserName();
  

  ngOnInit(): void {
      console.log('Starting "findAll" API call');
      this.loadingP = true;
      this.subscription = this.productService
          .userProducts(this.username)
          .subscribe({
        next: (apiData: MyProductAPIList) => {
          const { status , data } = apiData;
          this.myProductsList = data.products;
          console.log(status, data)
        },
        error: (error: any) => {
          this.loadingP = false;
          console.log(error);
        },
        complete: () => {
          this.loadingP = false;
          console.log('API call completed')
        }
      });
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }
}
