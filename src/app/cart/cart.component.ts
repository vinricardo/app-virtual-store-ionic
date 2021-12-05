import { AlertController, NavController } from '@ionic/angular';
import { CartService } from './../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  itemsCart: any[] = [];
  totalCartValue: number;

  constructor(private cartService: CartService, 
              public navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.itemsCart = this.cartService.getCart();
  }

  redirectToHome(){
    this.navCtrl.navigateForward('home')
  }

  clearCart(){
    this.itemsCart = this.cartService.clearCart();
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
   this.cartService.removeProduct(productCartId);
   this.itemsCart = this.cartService.getCart();
  }

}
