import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-remove',
  templateUrl: './popup-remove.component.html',
  styleUrls: ['./popup-remove.component.css']
})
export class PopupRemoveComponent implements OnInit {

  @Input() name;
  constructor(public modal: NgbActiveModal) { }


  ngOnInit(): void {
  }


}
