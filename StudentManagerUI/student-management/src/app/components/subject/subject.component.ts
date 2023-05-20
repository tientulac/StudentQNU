import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent extends BaseComponent implements OnInit {
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
      name: 'Môn học',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.SubjectId ?? null;
    if (this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      SubjectCode: data.SubjectCode ?? null,
      SubjectName: data.SubjectName ?? null,
    });
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      SubjectCode: [null],
      SubjectName: [null],
    });
    this.getListSubject();
  }

  delete() {
    this.subjectService.delete(this.ID_selected).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListSubject();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListSubject();
        }
      }
    );
  }

  addNew() {
    var req = this.addForm.value;
    req.SubjectId = this.ID_selected;
    this.subjectService.save(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListSubject();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListSubject();
        }
      }
    );
  }
}
