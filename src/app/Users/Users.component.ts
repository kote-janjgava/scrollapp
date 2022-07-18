import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../user.service';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  allUsers: any = [];
  totalPages: number | any;
  currentPage: number = 1;
  observer: any;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getdata();
  }

  ngAfterViewInit() {
    this.theLastList?.changes.subscribe((result: any) => {
      if (result.last) this.observer.observe(result.last.nativeElement);
    });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getdata();
        }
      }
    }, options);
  }
  getdata() {
    this.spinner.show;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.userService.getUsers(10, this.currentPage).subscribe((result: any) => {
      this.spinner.hide;
      this.allUsers = result;

      this.totalPages = result.pagination.total;

      result.list.forEach((element: any) => {
        this.allUsers.list.push(element);
      });
      this.intersectionObserver();
    });
  }
}
