import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { AppInjector } from 'src/module/app.module';
import { common } from '../app.common';
import { ResponseLogin } from '../model/output/ResponseLogin';
import { UntypedFormGroup } from '@angular/forms';
import { PointTypeService } from 'src/app/components/point-type/point-type.service';
import { SubjectService } from 'src/app/components/subject/subject.service';
import { SystemService } from 'src/service/system.service';
import { StudentService } from 'src/app/components/student/student.service';
import { ClassService } from 'src/app/components/class/class.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  router: Router;
  spinner: NgxSpinnerService;
  toastr: ToastrService;
  pointTypeService: PointTypeService
  subjectService: SubjectService
  systemService: SystemService
  studentService: StudentService
  classService: ClassService
  modalService: NzModalService

  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  pageSizes: any = [10, 20, 50, 100, 200, 500, 1000];
  listOfCurrentPageData: readonly any[] = [];
  listOfData: readonly any[] = [];

  constructor() {
    this.router = AppInjector.get(Router);
    this.spinner = AppInjector.get(NgxSpinnerService);
    this.toastr = AppInjector.get(ToastrService);
    this.pointTypeService = AppInjector.get(PointTypeService);
    this.subjectService = AppInjector.get(SubjectService);
    this.systemService = AppInjector.get(SystemService);
    this.studentService = AppInjector.get(StudentService);
    this.classService = AppInjector.get(ClassService);
    this.modalService = AppInjector.get(NzModalService);
  }

  currentPage: any = 1;
  arrNumberPage: any = [];
  arrNumberPage_chil: any = [];
  numberPage: any;
  page: any = 1;
  pageSize: any = 10;
  dataTable: any;
  getNull = false;
  totalItem!: number;
  totalItemFilter: any;
  isDisplay: boolean = true;
  submitted = false;
  closeResult!: string;
  dataPopup: any = {};
  com!: common;
  Token: any;
  isCheckAll: boolean = false;
  count: any = 0;
  isDisplayAddModal: boolean = false;
  isDisplayDelete: boolean = false;
  addForm!: UntypedFormGroup;
  listPointType: any;
  ID_selected: any;
  listSubject: any;
  listGenre: any;
  listMajor: any;
  listSchoolYear: any;
  listStudent: any;
  genre_selected: any;
  major_selected: any;
  schoolYear_selected: any;
  gender_selected: any;
  status_selected: any;
  school_year_selected: any;
  subject_selected: any;
  listClass: any;
  isDisplayStudent: any;
  titleModal: any;
  isDisplayStudentByClass: any = false;
  openDeleteModal(id: any) {
    this.ID_selected = id;
    this.isDisplayDelete = true;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  buttonFilter() {
    this.isDisplay = !this.isDisplay;
  }

  createNumberPage(totalItem: any, pageSize: any) {
    let numberPage = 0;
    let arrNumberPage = [];
    if (totalItem % pageSize == 0) {
      numberPage = Math.floor(totalItem / pageSize);
    } else {
      numberPage = Math.floor(totalItem / pageSize) + 1;
    }
    for (var i = 1; i <= numberPage; i++) {
      arrNumberPage.push(i);
    }
    let arrNumberPage_chil = [];
    if (arrNumberPage.length > 4) {
      for (var i = 1; i <= 4; i++) {
        arrNumberPage_chil.push(i);
      }
    } else {
      arrNumberPage_chil = arrNumberPage;
    }
    return {
      numberPage: numberPage,
      arrNumberPage_chil: arrNumberPage_chil,
    };
  }

  handlePageChange(event: any) {
    if (event == 'pre') {
      this.page = this.page - 1;
    } else if (event == 'next') {
      this.page = this.page + 1;
    } else {
      this.page = event;
      this.arrNumberPage_chil = [];
      for (var i = event - 3; i <= event + 3; i++) {
        if (i > 0 && i <= this.numberPage) {
          this.arrNumberPage_chil.push(i);
        }
      }
    }
  }

  remove_sign(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
  }

  async getInfor(): Promise<ResponseLogin> {
    let infor: ResponseLogin | null;
    this.com = new common(this.router);
    this.com.CheckLogin();
    infor = this.com.getUserinfo();
    return await infor;
  }

  async getToken() {
    let token = (await this.getInfor()).Token;
    return token.length > 0 ? token : null;
  }

  async sortElementByFeild(listAray: [], field: []) {
    _.sortBy(listAray, field);
    return listAray;
  }

  compareString(str1: any, str2: any) {
    if (this.remove_sign(str1.toString()).trim().includes(this.remove_sign(str2.toString().trim()))) return true;
    return false;
  }

  handleCancel() {
    this.modalService.closeAll();
  }

  getListPointType() {
    this.pointTypeService.getList().subscribe(
      (res: any) => {
        this.listPointType = res.data;
      }
    );
  }

  getListSubject() {
    this.subjectService.getList().subscribe(
      (res: any) => {
        this.listSubject = res.data;
      }
    );
  }

  getListStudent() {
    this.studentService.getList().subscribe(
      (res: any) => {
        this.listStudent = res.data;
      }
    );
  }

  getListClass() {
    this.classService.getList().subscribe(
      (res: any) => {
        this.listClass = res.data;
      }
    );
  }

  getDataSystem() {
    this.systemService.getListGenre().subscribe(
      (res: any) => {
        this.listGenre = res.data;
        this.systemService.getListMajor().subscribe(
          (res) => {
            this.listMajor = res.data;
            this.systemService.getListSchoolYear().subscribe(
              (res) => {
                this.listSchoolYear = res.data;
              }
            );
          }
        );
      }
    );
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ];

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.StudentId, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Data[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.StudentId));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.StudentId)) && !this.checked;
  }

  getStringId(m: any) {
    var rs = '';
    for (var k = 0; k < m.length; k++) {
      if (k == 0) {
        rs += m[k];
      } else {
        rs += ',' + m[k];
      }
    }
    return rs;
  }
}
