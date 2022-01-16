import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { dataMock } from '../shared/data/data-mock';
import { ModalPreviewPurchaseComponent } from '../shared/modals/modal-preview-purchase/modal-preview-purchase.component';
import {from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
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
              public navCtrl: NavController, 
              private toast: Toast) {
  }

  ngOnInit(){
    this.initGeoLocation();
    this.toast.show('Every store with 30% discount', '5000', 'top').subscribe()
  }

  async initGeoLocation(){
    let position$ = from(this.geolocation.getCurrentPosition())
    position$.subscribe((resp:GeolocationPosition) => {
    }, (err) => console.error(err))
    
   this.address$ = await this.geolocation.watchPosition().pipe(
      switchMap((data:Geoposition) =>
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
