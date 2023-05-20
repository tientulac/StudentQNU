import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_core/base/base.component';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent extends BaseComponent implements OnInit {
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
      name: 'Hệ',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.ID_selected = data.GenreId ?? null;
    if (this.ID_selected) {
      this.addForm.reset();
    }
    this.addForm.patchValue({
      GenreCode: data.GenreCode ?? null,
      GenreName: data.GenreName ?? null,
    });
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      GenreCode: [null],
      GenreName: [null],
    });
    this.getDataSystem();
  }

  delete() {
    this.systemService.deleteGenre(this.ID_selected).subscribe(
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
    req.GenreId = this.ID_selected;
    this.systemService.saveGenre(req).subscribe(
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
