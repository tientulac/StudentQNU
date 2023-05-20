import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.scss']
})
export class SchoolYearComponent extends BaseComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder
  ) {
    super();
  }

  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Khóa',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.SchoolYearId ?? null;
    if (this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      SchoolYearCode: data.SchoolYearCode ?? null,
      SchoolYearName: data.SchoolYearName ?? null,
    });
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      SchoolYearCode: [null],
      SchoolYearName: [null],
    });
    this.getDataSystem();
  }

  delete() {
    this.systemService.deleteSchoolYear(this.ID_selected).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getDataSystem();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getDataSystem();
        }
      }
    );
  }

  addNew() {
    var req = this.addForm.value;
    req.SchoolYearId = this.ID_selected;
    this.systemService.saveSchoolYear(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getDataSystem();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getDataSystem();
        }
      }
    );
  }
}
