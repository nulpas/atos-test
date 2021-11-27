import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigService } from '../../_config/config.service';
import { environment } from '../../../environments/environment';
import { ToolService } from '@circe/core';
import { ApiConfigFile } from '../../_types/app.types';
import { catchError } from 'rxjs/operators';

export interface HttpOptions {
  headers?: HttpHeaders;
  withCredentials?: boolean;
}
export interface HttpOptionsSimple {
  responseType: 'json';
  headers?: { [key: string]: string };
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' }) export class ApiService {
  public production: boolean;
  public httpOptions: HttpOptions;
  public httpOptionsSimple: HttpOptionsSimple;

  /**
   * @description
   * EndPoints for DEVELOPMENT use. PRODUCTION endPoints are in assets/config.json file.
   */
  public readonly baseMainEndPoint: string = 'http://localhost:3889';
  public readonly baseSecondaryEndPoint: string = '/assets/data';

  private readonly _forceToPro: boolean = false;

  constructor(private _http: HttpClient, private _zone: NgZone, private _config: ConfigService) {
    this.production = environment.production;
    this.production = (!this.production && this._forceToPro) ? true : this.production;
    if (this.production) {
      this.baseMainEndPoint = (_config.config as ApiConfigFile).BASE_API_URL__MAIN;
      this.baseSecondaryEndPoint = (_config.config as ApiConfigFile).BASE_API_URL__SECONDARY;
    }
    this.baseMainEndPoint = ToolService.checkLastChar(this.baseMainEndPoint, '/');
    this.baseSecondaryEndPoint = ToolService.checkLastChar(this.baseSecondaryEndPoint, '/');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpOptionsSimple = { responseType: 'json' };
  }

  public apiGet(endPoint: string, baseEndPoint?: string): Observable<any> {
    const _baseEndPoint: string = baseEndPoint || this.baseMainEndPoint;
    return this._http.get(`${_baseEndPoint}${endPoint}`, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('ERROR FROM DATA _apiGet', error);
        return of(error);
      })
    );
  }

  public apiPost(endPoint: string, requestBody: any, baseEndPoint?: string): Observable<any> {
    const _baseEndPoint: string = baseEndPoint || this.baseMainEndPoint;
    return this._http.post(`${_baseEndPoint}${endPoint}`, requestBody, this.httpOptionsSimple);
  }

  public apiPut(endPoint: string, requestBody: any, baseEndPoint?: string): Observable<any> {
    const _baseEndPoint: string = baseEndPoint || this.baseMainEndPoint;
    return this._http.put(`${_baseEndPoint}${endPoint}`, requestBody, this.httpOptionsSimple);
  }

  public apiDelete(endPoint: string, baseEndPoint?: string): Observable<any> {
    const _baseEndPoint: string = baseEndPoint || this.baseMainEndPoint;
    return this._http.delete(`${_baseEndPoint}${endPoint}`, this.httpOptions);
  }
}
