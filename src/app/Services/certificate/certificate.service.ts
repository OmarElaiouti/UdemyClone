import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icertificate } from '../../Models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  getCertificateData(courseId:number): Observable<Icertificate> {
    return this.http.get<Icertificate>(`http://localhost:5165/api/Category/api/course-data/api/${courseId}/get-or-create-certificate`);
  }}
