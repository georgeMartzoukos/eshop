import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../../../../projects/shared/src/lib/product.interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService, private router: Router) {
    this.form = this.fb.group({
      product: ['', [Validators.required]],
      description: [''],
      cost: ['',[Validators.required]],
      quantity: ['', [Validators.required]],
      image: ['']
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const product = this.form.value as Product;
      this.service.insertProduct(product).subscribe((response) => {
        console.log(response)
      });
      this.form.reset();
      //this.router.navigate(['/product/list']);
    } else {
      console.log('Form is not valid')
    }
  }
}
