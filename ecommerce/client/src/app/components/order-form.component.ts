import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CategoryComponent } from './category.component';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component


 
  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)


  @Input({ required: true })
  productId!: string

  @Input({ required: true })
  productName!: string

  @Input({ required: true })
  productPrice!: number


  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }


  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.productName,
      price: this.productPrice,
    }
    console.info('>>> entry: ', lineItem)
    console.log("id:", lineItem.prodId, 
                "quant:", lineItem.quantity, 
                "name:", lineItem.name,
                "price:", lineItem.price)

   this.cartStore.add(lineItem).then(result => {this.form.reset})
  }


  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
