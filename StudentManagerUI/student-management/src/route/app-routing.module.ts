import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_core/guard/auth.guard';
import { NonAuthGuard } from 'src/app/_core/guard/non-auth.guard';
import { ClassComponent } from 'src/app/components/class/class.component';
import { GenreComponent } from 'src/app/components/genre/genre.component';
import { MajorComponent } from 'src/app/components/major/major.component';
import { PointTypeComponent } from 'src/app/components/point-type/point-type.component';
import { SchoolYearComponent } from 'src/app/components/school-year/school-year.component';
import { StudentComponent } from 'src/app/components/student/student.component';
import { SubjectComponent } from 'src/app/components/subject/subject.component';
import { TestComponent } from 'src/app/components/test/test.component';
import { MainComponent } from 'src/layout/main/main.component';
import { LoginComponent } from 'src/page/login/login.component';

const routes: Routes = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    children: [
      {
        path: 'point-type',
        component: PointTypeComponent,
      },
      {
        path: 'subject',
        component: SubjectComponent,
      },
      {
        path: 'genre',
        component: GenreComponent,
      },
      {
        path: 'major',
        component: MajorComponent,
      },
      {
        path: 'school-year',
        component: SchoolYearComponent,
      },
      {
        path: 'student',
        component: StudentComponent,
      },
      {
        path: 'class',
        component: ClassComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
