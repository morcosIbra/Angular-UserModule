import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-loading',
  templateUrl: './popup-loading.component.html',
  styleUrls: ['./popup-loading.component.css']
})
export class PopupLoadingComponent implements OnInit {

  @Input() message;

  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit() {
  }
}
