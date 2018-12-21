import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupLoadingComponent } from './popup-loading/popup-loading.component';
import { PopupRemovingComponent } from './popup-removing/popup-removing.component';
import {  NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    MatProgressSpinnerModule
  ],
  declarations: [PopupLoadingComponent, PopupRemovingComponent],
  entryComponents: [PopupLoadingComponent, PopupRemovingComponent]
})
export class SharedModule { }
