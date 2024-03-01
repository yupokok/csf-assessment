import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';
import { Observable, Subject } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)
  private prodSvc = inject(ProductService)

  checkoutForm!: FormGroup
  lineitems$!: Promise<LineItem[]>
  lineItems: LineItem[] =[]
  cart!: Cart
  total! : any

  ngOnInit(): void {
    this.checkoutForm = this.createCheckoutForm()
    this.lineitems$ = this.cartStore.loadCart()
    this.getTotal()
    this.cartStore.loadCart().then(result => this.lineItems=result)
                             .then((result)=> console.log(result))
                             
    console.info('>>> lineitems: ', this.lineItems)
    

  }

  public createCheckoutForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
  }


  getTotal() {
    console.log(this.cartStore.loadCart().then((li: LineItem[]) => li.forEach(li => li.price.valueOf)))
    this.total = this.cartStore.loadCart().then((li: LineItem[]) => li.forEach(li => li.price))
  }



  checkout() {
      const order: Order = {
      name: this.checkoutForm.value['name'],
      address: this.checkoutForm.value['address'],
      priority: this.checkoutForm.value['priority'],
      comments: this.checkoutForm.value['comments'],
      cart: this.cart
    }
    console.info('>>> order: ', order)
    this.prodSvc.checkout(order)
  }

  processCart(lineItem: LineItem[]){
    console.log("processing order", lineItem)
  }
  
}
