import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { common } from 'src/app/_core/app.common';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  [x: string]: any;
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  public searchForm!: FormGroup;
  com!: common

  constructor(
    @Inject(AppConfig) 
    private readonly appConfig: AppConfiguration,
    private appService: AppService, 
    private spinner: NgxSpinnerService,
    public router: Router,
    private toastr: ToastrService,
    ) {}

  ngOnInit() {
    this.com = new common(this.router);
    var User = this.com.getUserinfo();
    console.log(User.Account.UserName);
    this['UserName'] = User.Account.UserName ?? '';
    this.com.CheckLogin();
    var UserData = this.com.getUserinfo();
    this['Token'] = UserData.Token ?? '';
  }

  logout() {
    this.appService.logout();
  }
}
