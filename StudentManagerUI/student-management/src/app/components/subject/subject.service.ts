import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    constructor(
        @Inject(AppConfig) private readonly appConfig: AppConfiguration,
        private router: Router,
        private http: HttpClient
    ) { }

    getList(): Observable<any> {
        return this.http.get<any>(this.appConfig.API + 'api/v1/subject').pipe(map((z) => { return z; }));
    }

    delete(id: any): Observable<any> {
        return this.http.delete<any>(this.appConfig.API + 'api/v1/subject?id=' + id).pipe(map((z) => { return z; }));
    }

    save(req: any): Observable<any> {
        return this.http.post<any>(this.appConfig.API + 'api/v1/subject', req).pipe(map((z) => { return z; }));
    }
}
