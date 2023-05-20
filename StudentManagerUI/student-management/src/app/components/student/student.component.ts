import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent extends BaseComponent implements OnInit {
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
      name: 'Sinh viên',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.StudentId ?? null;
    if (!this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      StudentCode: data.StudentCode ?? null,
      FullName: data.FullName ?? null,
      Age: data.Age ?? null,
      Email: data.Email ?? null,
      Phone: data.Phone ?? null,
      Address: data.Address ?? null,
      AdmisionDate: data.AdmisionDate.substring(0, 10) ?? null,
      Birth: data.Birth.substring(0, 10) ?? null,
    });
    this.genre_selected = data.GenreId ?? null;
    this.gender_selected = data.Gender ?? null;
    this.school_year_selected = data.SchoolYearId ?? null;
    this.major_selected = data.MajorId ?? null;
    this.schoolYear_selected = data.SchoolYearId ?? null;
    this.status_selected = data.Status ?? null;
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      StudentCode: [null],
      FullName: [null],
      Age: [null],
      Email: [null],
      Phone: [null],
      Address: [null],
      AdmisionDate: [null],
      Birth: [null],
    });
    this.getListStudent();
    this.getDataSystem();
  }

  delete() {
    this.studentService.delete(this.ID_selected).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListStudent();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListStudent();
        }
      }
    );
  }

  addNew() {
    var req = this.addForm.value;
    req.StudentId = this.ID_selected;
    req.GenreId = this.genre_selected;
    req.Gender = this.gender_selected;
    req.MajorId = this.major_selected;
    req.SchoolYearId = this.school_year_selected;
    req.Status = this.status_selected;
    this.studentService.save(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListStudent();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListStudent();
        }
      }
    );
  }
}
