import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-loading',
  templateUrl: './popup-loading.component.html',
  styleUrls: ['./popup-loading.component.css']
})
export class PopupLoadingComponent implements OnInit {

  @Input() message;

  constructor(public modal: NgbActiveModal) { }


  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content);
  }
  
}
