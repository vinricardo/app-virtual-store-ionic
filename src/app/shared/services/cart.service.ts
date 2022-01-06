import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: any[] = [];
  totalCartValue: number = 0;
  constructor(private sms: SMS) { }

  updateCart(product:any){
    this.totalCartValue = parseFloat(product.value) + this.totalCartValue;
    this.products.push(product)
  }

  clearCart(){
    this.products = [];
    this.totalCartValue = 0
   return this.products;
  }

  resetCart(){
    if(this.totalCartValue != 0){
      this.sms.hasPermission().then()
      this.sms.send('84994831443',`Finished purchase! Total: $${this.totalCartValue}`)
    }
    this.totalCartValue = 0
    return [];
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
