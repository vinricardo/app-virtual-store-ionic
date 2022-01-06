import { AlertController, ModalController } from '@ionic/angular';
import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-preview-purchase',
  templateUrl: './modal-preview-purchase.component.html',
  styleUrls: ['./modal-preview-purchase.component.scss'],
})
export class ModalPreviewPurchaseComponent implements OnInit {
  @Input() item: any;
  count: number = 1;
  total: string;
  constructor(private cartService: CartService, public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
    this.total = (this.item.value as number).toFixed(2);
  }
  
  dismiss() {
    this.modalController.dismiss(this.cartService.products.length);
  }

  additionCount(){
    this.count++;
    this.total = (this.item.value * this.count).toFixed(2);
  }

  decrementCount(){
    if(this.count != 1){
     this.count--;
     this.total = (this.item.value * this.count).toFixed(2);
    }
  }

  addToCart(){
    const syncValue = (this.item.value * this.count).toFixed(2);
    this.cartService.updateCart(Object.assign({
      id: Math.floor(Math.random()*5000000), 
      quantity: this.count, 
      value:syncValue , 
      title: this.item.title,
      img: this.item.img
    }))
    this.presentAlert();
    this.dismiss()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Added item',
      mode:'ios',
      subHeader: 'You just added an item to the cart',
      buttons: ['OK']
    });

    await alert.present();
  }

}
