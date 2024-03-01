
// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { LineItem } from "./models";
import Dexie from "dexie";
import { Subject } from "rxjs";


@Injectable()
export class CartStore extends Dexie {

    private shoppingcart!: Dexie.Table<LineItem, string>
    onItems = new Subject<LineItem[]>

    constructor() {
        super('shoppingcart')
        this.version(1).stores({
            "lineItems": '++cartId'
        })
        
        this.shoppingcart = this.table("lineItems")
        this.loadCart().then(
            (result) => this.onItems.next(result)
        )

    }

    // getCart(): Promise<LineItem[]> {
    //     return this.shoppingcart.toArray()
    // }

    loadCart(): Promise<LineItem[]> {
        return this.shoppingcart.toArray()
          .then((li:LineItem[]) => li.map(l => {
            return {
              prodId: l.prodId,
              price: l.price,
              quantity: l.quantity,
              name: l.name
            } as LineItem
          }
          ))
      }



    getCount()  {
     this.shoppingcart.toCollection().count(function (count) {console.log("hello" , count)}).then(this.getCount)                     
    }

    add(lineItem: LineItem): Promise<any> {
        return this.shoppingcart.add(lineItem)
            .then(pk => {
                console.info('>> pk ', pk)
                return this.loadCart()
            })
            .then(result => this.onItems.next(result))
    }






    // constructor() { super(INIT) }

    // readonly addToStore = this.updater<LineItem>(
    //     (slice: Cart, value: LineItem) => {
    //         const newSlice: Cart = {
    //             lineItems: []
    //         }
    //         for (let i of slice.lineItems)
    //             newSlice.lineItems.push(i)
    //         newSlice.lineItems.push(value)
    //         return newSlice
    //     }
    //     console.log("Added SUccessfully")
    // )

    // readonly loadToStore = this.updater<LineItem[]>(
    //     (_slice: Cart, values: LineItem[]) => {
    //         return {
    //             lineItems: values
    //         } as Cart
    //     }
    // )
    // readonly getAllItems = this.select<LineItem[]>(
    //     (slice: Cart) => slice.lineItems
    // )

    // readonly getItemsWhereQuantity = (quantity: number) =>
    //     this.select<LineItem[]>(
    //         (slice: Cart) => slice.lineItems.filter(item => item.quantity < quantity)
    //     )




}
