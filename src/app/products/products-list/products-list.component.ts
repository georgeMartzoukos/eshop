import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, ProductAPIList } from '../../../../projects/shared/src/lib/product.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  
    constructor(private productService: ProductService) {}

    loading = false;
    productList: Product[] = [];
    subscription: Subscription | undefined;

    ngOnInit(): void {
        console.log('Starting "findAll" API call');
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

  
}
