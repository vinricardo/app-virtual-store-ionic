import { CartService } from './../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { dataMock } from '../shared/data/data-mock';
import { ModalPreviewPurchaseComponent } from '../shared/modals/modal-preview-purchase/modal-preview-purchase.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items?: any[] = dataMock;
  constructor(public modalController: ModalController, 
              private cartService: CartService,
              public navCtrl: NavController) {
                
  }

  ngOnInit(){}

  async previewModal(object?:any){
    const modal = await this.modalController.create({
      component: ModalPreviewPurchaseComponent,
      componentProps: {
        'item': object
      }
    })
    return await modal.present();
  }

  redirectToCart(){
    this.navCtrl.navigateForward('cart')
  }

}
