import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent extends BaseComponent implements OnInit {
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
      name: 'Lớp học',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.ClassId ?? null;
    if (this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      ClassCode: data.ClassCode ?? null,
      ClassName: data.ClassName ?? null,
      Room: data.Room ?? null,
      Lession: data.Lession ?? null,
      Teacher: data.Teacher ?? null,
      Slot: data.Slot ?? null,
      Descrip: data.Descrip ?? null,
    });
    this.subject_selected = data.SubjectId ?? null;
  }

  openStudentModal(data: any) {
    this.isDisplayStudent = true;
    this.ID_selected = data.ClassId ?? null;
    this.titleModal = data.ClassName;
    this.getListStudent();
    this.studentService.getByClass(this.ID_selected).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          res.data.forEach((x: any) => {
            this.setOfCheckedId.add(x.StudentId);
          });
        }
      }
    );
  }

  openStudentByClassModal(data: any) {
    this.isDisplayStudentByClass = true;
    this.ID_selected = data.ClassId ?? null;
    this.titleModal = data.ClassName;
    this.studentService.getByClass(this.ID_selected).subscribe(
      (res: any) => {
        this.listStudent = res.data;
      }
    );
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      ClassCode: [null],
      ClassName: [null],
      Room: [null],
      Lession: [null],
      Teacher: [null],
      Slot: [null],
      Descrip: [null],
    });
    this.getListClass();
    this.getListSubject();
    this.getListStudent();
  }

  delete() {
    this.classService.delete(this.ID_selected).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListClass();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListClass();
        }
      }
    );
  }

  addNew() {
    var req = this.addForm.value;
    req.ClassId = this.ID_selected;
    req.SubjectId = this.subject_selected;
    this.classService.save(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListClass();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListClass();
        }
      }
    );
  }

  addStudent() {
    const array = Array.from(this.setOfCheckedId);
    let req = {
      ClassId: this.ID_selected,
      ListStudentId: array
    }
    if (this.setOfCheckedId.size > 0) {
      this.classService.saveStudent(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success(res.message);
            this.getListStudent();
          }
          else {
            this.getListStudent();
            this.toastr.warning(res.message);
          }
        }
      );
    }
    else {
      this.toastr.warning('Bạn chưa chọn sinh viên');
    }
  }
}
