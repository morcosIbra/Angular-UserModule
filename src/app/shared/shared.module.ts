import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupLoadingComponent } from './popup-loading/popup-loading.component';
import { PopupRemovingComponent } from './popup-removing/popup-removing.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    MatProgressSpinnerModule
  ],
  declarations: [PopupLoadingComponent, PopupRemovingComponent, DropdownDirective],
  entryComponents: [PopupLoadingComponent, PopupRemovingComponent]
})
export class SharedModule { }
