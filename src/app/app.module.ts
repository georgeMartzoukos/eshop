import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from '../../projects/ui/src/lib/page-not-found/page-not-found.component';
import { DropdownComponent } from '../../projects/ui/src/lib/dropdown/dropdown.component';
import { AlertComponent } from '../../projects/ui/src/lib/alert/alert.component';
import { MyProductsComponent } from './products/my-products/my-products.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DropdownComponent,
    AlertComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
