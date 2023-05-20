import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss']
})
export class MajorComponent extends BaseComponent implements OnInit {
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
      name: 'Khoa',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.MajorId ?? null;
    if (this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      MajorCode: data.MajorCode ?? null,
      MajorName: data.MajorName ?? null,
    });
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      MajorCode: [null],
      MajorName: [null],
    });
    this.getDataSystem();
  }

  delete() {
    this.systemService.deleteMajor(this.ID_selected).subscribe(
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
    req.MajorId = this.ID_selected;
    this.systemService.saveMajor(req).subscribe(
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
