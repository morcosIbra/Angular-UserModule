import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupLoadingComponent } from './popUp/popUp-loading/popUp-loading.component';
import { PopupRemoveComponent } from './popUp/popup-remove/popup-remove.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NgbModule
  ],
  declarations: [PopupLoadingComponent, PopupRemoveComponent],
  entryComponents: [PopupLoadingComponent, PopupRemoveComponent]
})
export class SharedModule { }
