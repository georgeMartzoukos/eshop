import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { ProductsListComponent } from '../products/products-list/products-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'' , component: WelcomeComponent },
];

@NgModule({
  declarations: [LoginComponent, WelcomeComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class PublicModule {}
