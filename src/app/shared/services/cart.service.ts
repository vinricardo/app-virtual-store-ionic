import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: any[] = [];
  totalCartValue: number = 0;
  constructor() { }

  updateCart(product:any){
    this.totalCartValue = parseFloat(product.value) + this.totalCartValue;
    this.products.push(product)
  }

  clearCart(){
    this.products = [];
    this.totalCartValue = 0
   return this.products;
  }

  getCart(){
    return this.products;
  }

  get totalValue(){
    return this.totalCartValue.toFixed(2)
  }

  removeProduct(productCartId:number){
    const index = this.products.findIndex((item) => item.id==productCartId)
    this.totalCartValue = this.totalCartValue - parseFloat(this.products[index].value);
    this.products.splice(index,1);
  }
}
