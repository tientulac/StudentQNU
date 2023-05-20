import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';

@Component({
  selector: 'app-point-type',
  templateUrl: './point-type.component.html',
  styleUrls: ['./point-type.component.scss']
})
export class PointTypeComponent extends BaseComponent implements OnInit {
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
      name: 'Loại diểm',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.PointTypeId ?? null;
    if (this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      PointTypeCode: data.PointTypeCode ?? null,
      PointTypeName: data.PointTypeName ?? null,
      Descrip: data.Descrip ?? null
    });
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      PointTypeCode: [null],
      PointTypeName: [null],
      Descrip: [null],
    });
    this.getListPointType();
  }

  delete() {
    this.pointTypeService.delete(this.ID_selected).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListPointType();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListPointType();
        }
      }
    );
  }

  addNew() {
    var req = this.addForm.value;
    req.PointTypeId = this.ID_selected;
    this.pointTypeService.save(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getListPointType();
          this.handleCancel();
        }
        else {
          this.toastr.warning(res.message);
          this.getListPointType();
        }
      }
    );
  }
}
