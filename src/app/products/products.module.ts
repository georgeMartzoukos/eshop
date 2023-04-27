import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductService } from './product.service';

import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'insert', component: ProductInsertComponent },
  { path: 'myProducts', component: MyProductsComponent}
]

@NgModule({
  declarations: [
    ProductInsertComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule, ReactiveFormsModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
