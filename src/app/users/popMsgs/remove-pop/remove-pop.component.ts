import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'q';

@Component({
  selector: 'app-remove-pop',
  templateUrl: './remove-pop.component.html',
  styleUrls: ['./remove-pop.component.css']
})
export class RemovePopComponent implements OnInit {

  @Input() name;
  constructor(public modal: NgbActiveModal) { }


  ngOnInit(): void {
   
  }


}
