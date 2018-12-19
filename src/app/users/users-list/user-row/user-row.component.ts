import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemovePopComponent } from '../../popMsgs/remove-pop/remove-pop.component';
import { UsersService } from '../../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../popMsgs/loading/loading.component';

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
  onEdit(e) {
    e.stopPropagation();
    console.log(this.route);

    this.router.navigate(['./' + this.user.id + '/edit'], { relativeTo: this.route });
  }
  onRemove() {
    const modalRef = this.modalService.open(RemovePopComponent);
    modalRef.componentInstance.name = this.user.first_name + ' ' + this.user.last_name;
    modalRef.result.then(
      res => {
        console.log(res);
        const loadingMsgRef = this.modalService.open(LoadingComponent);
        loadingMsgRef.componentInstance.message = 'Deleting ' + this.user.first_name
          + ' ' + this.user.last_name + ' profile';
        this.usersService.removeUser(this.user.id).subscribe(
          result => {
            console.log(res);
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
