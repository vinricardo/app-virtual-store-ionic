import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPreviewPurchaseComponent } from './modal-preview-purchase.component';

describe('ModalPreviewPurchaseComponent', () => {
  let component: ModalPreviewPurchaseComponent;
  let fixture: ComponentFixture<ModalPreviewPurchaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreviewPurchaseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPreviewPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
