import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConsumoApiService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  headersFile = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Accept':'*/*'
  });
  options = { headers: this.headers };

  optionsFile={headers:this.headersFile};

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, JSON.stringify(data), this.options);
  }
  get(serviceName: string) {
    const url = environment.apiUrl + serviceName;
    return this.http.get(url,this.options);
  }
  put(serviceName: string, data: any) {
    const url = environment.apiUrl + serviceName;
    return this.http.put(url,JSON.stringify(data),this.options);
  }
  delete(serviceName: string) {
    const url = environment.apiUrl + serviceName;
    return this.http.delete(url,this.options);
  }
  
  subirImagen(serviceName:string,data:any){
    const urlFile = environment.urlStorage + serviceName;
    return this.http.post(urlFile, data);
  }
}
