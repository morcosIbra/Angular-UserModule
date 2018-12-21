import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupRemovingComponent } from 'src/app/shared/popup-removing/popup-removing.component';
import { PopupLoadingComponent } from 'src/app/shared/popup-loading/popup-loading.component';


@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit {
  @Input() user;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  //route user to user-form
  onEdit(e) {
    e.stopPropagation();
    console.log(this.route);

    this.router.navigate(['./' + this.user.id + '/edit'], { relativeTo: this.route });
  }
  
  //pop up remove confirm message if yes call loading popup and usersService.removeUser
  //if not no action taken
  onRemove() {
    const modalRef = this.modalService.open(PopupRemovingComponent,{ size: 'lg' });
    modalRef.componentInstance.name = this.user.first_name + ' ' + this.user.last_name;
    modalRef.result.then(
      res => {
        console.log(res);
        const loadingMsgRef = this.modalService.open(PopupLoadingComponent);
        loadingMsgRef.componentInstance.message = 'Deleting user' ;
        this.usersService.removeUser(this.user.id).subscribe(
          result => {
            console.log(res);
            this.router.navigate(['/users']);
            loadingMsgRef.dismiss()
          },
          error=>{
            loadingMsgRef.dismiss()
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

}
