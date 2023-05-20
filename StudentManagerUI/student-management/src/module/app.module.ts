import { AppRoutingModule } from '../route/app-routing.module';
import { AppComponent } from '../app/app.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from 'src/page/login/login.component';
import { HeaderComponent } from 'src/layout/header/header.component';
import { FooterComponent } from 'src/layout/footer/footer.component';
import { SideBarComponent } from 'src/layout/side-bar/side-bar.component';
import { MainComponent } from 'src/layout/main/main.component';
import { AccService } from 'src/service/acc.service';
import { AppService } from 'src/service/app.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injector, NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonNgZorroAntdModule } from './ng-zorro-antd.module';
import { ToastrModule } from 'ngx-toastr';
import {
  registerLocaleData,
  LocationStrategy,
  HashLocationStrategy,
  DatePipe,
  CommonModule,
} from '@angular/common';
import { BreadCrumbRouterComponent } from 'src/app/_core/bread-crumb-router/bread-crumb-router.component';
import { TestComponent } from 'src/app/components/test/test.component';
import { PointTypeComponent } from 'src/app/components/point-type/point-type.component';
import { SubjectComponent } from 'src/app/components/subject/subject.component';
import { GenreComponent } from 'src/app/components/genre/genre.component';
import { MajorComponent } from 'src/app/components/major/major.component';
import { SchoolYearComponent } from 'src/app/components/school-year/school-year.component';
import { StudentComponent } from 'src/app/components/student/student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClassComponent } from 'src/app/components/class/class.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    MainComponent,
    TestComponent,
    BreadCrumbRouterComponent,
    PointTypeComponent,
    SubjectComponent,
    GenreComponent,
    MajorComponent,
    SchoolYearComponent,
    StudentComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    CommonNgZorroAntdModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    AccService,
    AppService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}

export let AppInjector: Injector;

