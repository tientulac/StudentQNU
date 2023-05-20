import { Component, OnInit, } from '@angular/core';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/module/app.module';
import { TestService } from './test.service';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {


  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Test',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  testService: TestService;

  constructor(
    private fb: UntypedFormBuilder
  ) {
    super();
    this.testService = AppInjector.get(TestService);
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
    await this.getList();
  }

  getList() {
    this.testService.getList('token').subscribe(
      (res: any) => {
        this.dataTable = res;
      }
    );
  }

  openAddModal(data: any) {
    this.isDisplayAddModal = true;
    this.addForm.patchValue({
      code: data.title ?? null,
      name: data.author ?? null
    });
  }

  addNew() {
    if (this.addForm.valid) {
      console.log('submit', this.addForm.value);
    } else {
      Object.values(this.addForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  delete() {

  }
}
