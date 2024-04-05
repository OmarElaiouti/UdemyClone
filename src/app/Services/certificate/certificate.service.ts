import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icertificate } from '../../Models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  getCertificateData(): Observable<Icertificate> {
    return this.http.get<Icertificate>('YOUR_API_ENDPOINT_HERE');
  }}
