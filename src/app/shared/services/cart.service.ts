import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: any[] = [];
  totalCartValue: number = 0;
  constructor(private nativeStorage: NativeStorage) {
  }

  updateCart(product:any){
    this.totalCartValue = parseFloat(product.value) + this.totalCartValue;
    this.products.push(product)
    this.nativeStorage.setItem('cart', this.products).then();
  }

  async clearCart(){
    this.products = [];
    this.totalCartValue = 0
    await this.nativeStorage.remove('cart').then();
   return this.products;
  }

  resetCart(){
    this.totalCartValue = 0
    return [];
  }

  async getCart(){
    await this.nativeStorage.getItem('cart').then(res => {
      this.products = res
    });
    return this.products;
  }

  removeProduct(productCartId:number){
    const index = this.products.findIndex((item) => item.id==productCartId)
    this.products.splice(index,1);
    this.nativeStorage.setItem('cart', this.products).then();
    return this.products;
  }
}
