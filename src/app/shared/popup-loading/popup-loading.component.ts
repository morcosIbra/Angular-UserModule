import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-loading',
  templateUrl: './popup-loading.component.html',
  styleUrls: ['./popup-loading.component.scss']
})
export class PopupLoadingComponent implements OnInit {

  @Input() message;
  modalRef: any;
  constructor() { }


  ngOnInit() {
  }
  // open(message) {
  //   this.modalRef = this.modalService.open(PopupLoadingComponent);
  //   this.modalRef.componentInstance.message = message;
  // }
  // dismiss() {
  //   this.modalRef.dismiss();
  // }
}
