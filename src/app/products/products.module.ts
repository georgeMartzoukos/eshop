import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { ProductService } from './product.service';

import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';




const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'insert', component: ProductInsertComponent },
  { path: 'myProducts', component: MyProductsComponent}
]

@NgModule({
  declarations: [
    ProductInsertComponent,
    ProductsListComponent,
    MyProductsComponent,
    ProductPageComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule, ReactiveFormsModule,NgIf
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
