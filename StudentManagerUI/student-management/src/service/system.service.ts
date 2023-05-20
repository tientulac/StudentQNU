import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class SystemService {
    constructor(
        @Inject(AppConfig) private readonly appConfig: AppConfiguration,
        private router: Router,
        private http: HttpClient
    ) { }

    getListGenre(): Observable<any> {
        return this.http.get<any>(this.appConfig.API + 'api/v1/genre').pipe(map((z) => { return z; }));
    }

    deleteGenre(id: any): Observable<any> {
        return this.http.delete<any>(this.appConfig.API + 'api/v1/genre?id=' + id).pipe(map((z) => { return z; }));
    }

    saveGenre(req: any): Observable<any> {
        return this.http.post<any>(this.appConfig.API + 'api/v1/genre', req).pipe(map((z) => { return z; }));
    }

    getListMajor(): Observable<any> {
        return this.http.get<any>(this.appConfig.API + 'api/v1/major').pipe(map((z) => { return z; }));
    }

    deleteMajor(id: any): Observable<any> {
        return this.http.delete<any>(this.appConfig.API + 'api/v1/major?id=' + id).pipe(map((z) => { return z; }));
    }

    saveMajor(req: any): Observable<any> {
        return this.http.post<any>(this.appConfig.API + 'api/v1/major', req).pipe(map((z) => { return z; }));
    }

    getListSchoolYear(): Observable<any> {
        return this.http.get<any>(this.appConfig.API + 'api/v1/school-year').pipe(map((z) => { return z; }));
    }

    deleteSchoolYear(id: any): Observable<any> {
        return this.http.delete<any>(this.appConfig.API + 'api/v1/school-year?id=' + id).pipe(map((z) => { return z; }));
    }

    saveSchoolYear(req: any): Observable<any> {
        return this.http.post<any>(this.appConfig.API + 'api/v1/school-year', req).pipe(map((z) => { return z; }));
    }
}
