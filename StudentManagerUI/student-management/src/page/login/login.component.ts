import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequestLogin } from 'src/app/_core/model/input/RequestLogin';
import { ResponseLogin } from 'src/app/_core/model/output/ResponseLogin';
import { AccService } from 'src/service/acc.service';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'main.css']
})
export class LoginComponent {
  public requestLogin!: RequestLogin;
  public loginResult!: ResponseLogin;
  
  loginForm = new FormGroup({
    UserName: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private accService: AccService,
    private appService: AppService,
    private http: HttpClient,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    this.requestLogin = new RequestLogin();
    this.cookieService.deleteAll;
    this.loginResult = new ResponseLogin();
  }

  Ridrect() {
    this.appService.login();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }

  login() {
    if (this.loginForm.valid) {
      let req = {
        UserName: this.loginForm.value.UserName,
        Password: this.loginForm.value.Password,
        //UserCategory: 1,
        //ID_ph: 11
      };
      this.accService.login(req).subscribe((res: any) => {
        if (res.status == 200) {
          this.toastr.success('Đăng nhập thành công');
          localStorage.setItem('UserInfo', JSON.stringify(res.data));
          this.appService.login();
        } else {
          this.toastr.error(res.Message, 'Tác vụ thất bại');
          localStorage.removeItem('UserInfo');
        }
      });
    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Tác vụ thất bại');
    }
  }
}
