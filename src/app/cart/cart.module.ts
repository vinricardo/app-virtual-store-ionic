import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

@NgModule({
  declarations: [ CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    CartPageRoutingModule
  ],
  providers: [SMS]
})
export class CartModule { }
