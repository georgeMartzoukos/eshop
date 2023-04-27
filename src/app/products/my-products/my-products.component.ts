import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductAPIList } from 'projects/shared/src/lib/product.interfaces';
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

  loading = false;
  myProductsList: Product[] = [];
  subscription: Subscription | undefined;
  

  ngOnInit(): void {
      console.log('Starting "findAll" API call');
      this.loading = true;
      this.subscription = this.productService.findOne(loggedInUsername$).subscribe({
        next: (apiData: ProductAPIList) => {
          const { status , data } = apiData;
          this.myProductsList = data;
          console.log(status, data)
        },
        error: (error: any) => {
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
}
