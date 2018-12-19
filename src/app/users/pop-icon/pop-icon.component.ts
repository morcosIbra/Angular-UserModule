import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'q';

@Component({
  selector: 'app-pop-icon',
  templateUrl: './pop-icon.component.html',
  styleUrls: ['./pop-icon.component.css']
})
export class PopIconComponent implements OnInit {

  @Input() name;
  constructor(public modal: NgbActiveModal) { }


  ngOnInit(): void {
   
  }


}
