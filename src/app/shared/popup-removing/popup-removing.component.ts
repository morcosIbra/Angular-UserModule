import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-removing',
  templateUrl: './popup-removing.component.html',
  styleUrls: ['./popup-removing.component.css']
})
export class PopupRemovingComponent implements OnInit {

  @Input() name;
  constructor(public modal: NgbActiveModal) { }


  ngOnInit(): void {
  }

}
