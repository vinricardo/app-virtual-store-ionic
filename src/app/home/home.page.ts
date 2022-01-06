import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { dataMock } from '../shared/data/data-mock';
import { ModalPreviewPurchaseComponent } from '../shared/modals/modal-preview-purchase/modal-preview-purchase.component';
import {from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items?: any[] = dataMock;
  address$!: Observable<any>;
  geolocationEndpoint = {
    get : () => `https://nominatim.openstreetmap.org/reverse.php`
  }
  constructor(public modalController: ModalController, 
              private geolocation: Geolocation,
              private http: HttpClient,
              public navCtrl: NavController) {
                
  }

  ngOnInit(){
    this.initGeoLocation();
  }

  async initGeoLocation(){
    let position$ = from(this.geolocation.getCurrentPosition())
    position$.subscribe((resp:GeolocationPosition) => {
    }, (err) => console.error(err))
    
   this.address$ = await this.geolocation.watchPosition().pipe(
      switchMap((data:any) =>
        this.http.get(this.geolocationEndpoint.get(), {
          params: {
            lat: data.coords.latitude,
            lon: data.coords.longitude,
            zoom: 18,
            format: 'jsonv2'
          }
        })
      ), map((res:any) => res.address))
  }

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
