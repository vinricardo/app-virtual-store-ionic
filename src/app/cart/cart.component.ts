import { AlertController, NavController } from '@ionic/angular';
import { CartService } from './../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  itemsCart: Product[] = [];
  totalCartValue!: any[];
  cartTotal: any = parseFloat('0');
  formGroup!:FormGroup;

  constructor(private cartService: CartService, 
              public navCtrl: NavController,
              public alertController: AlertController,
              private fb: FormBuilder
              ) { }

    createForm(){
      this.formGroup = this.fb.group({
        valueCart: ['']
      })
    }

  ngOnInit() {
    this.createForm()
    this.cartService.getCart().then((res:Product[])=> {
      this.itemsCart = res
      this.totalCartValue = []
      res.forEach(product => this.totalCartValue.push(product.value ?? parseFloat('0')))
      this.formGroup.get('valueCart').patchValue(this.updateValueCart());
    })
  }

  redirectToHome(){
    this.navCtrl.navigateForward('home')
  }

  clearCart(){
    this.cartService.clearCart().then((res) => {
      this.itemsCart = res
      this.totalCartValue = []
      res.forEach(product => this.totalCartValue.push(product.value ??  parseFloat('0')))
      this.formGroup.get('valueCart').reset();
    })
  }

  async finishBuy(){
    const alert = await this.alertController.create({
      header: 'Finished purchase',
      mode:'ios',
      subHeader: 'We appreciate the preference!',
      buttons: ['OK']
    });
    await alert.present();
    this.clearCart();
  }

  removeProduct(productCartId:number){
    this.itemsCart = this.cartService.removeProduct(productCartId)
    this.totalCartValue = []
    this.itemsCart.forEach(product => this.totalCartValue.push(product.value ??  parseFloat('0')))
    this.formGroup.get('valueCart').patchValue(this.updateRemoveValueCart());
  }

  updateValueCart(){
    this.totalCartValue.forEach(product => {
      this.cartTotal = ( parseFloat(product) + this.cartTotal) ??  parseFloat('0');
    })
    return this.cartTotal.toFixed(2);
  }

  updateRemoveValueCart(){
    this.cartTotal =  parseFloat('0');
    this.totalCartValue.forEach(product => {
      this.cartTotal = (  parseFloat(product) + this.cartTotal) ??  parseFloat('0');
    })
    return this.cartTotal.toFixed(2);
  }


}
