import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigFile } from '../_types/app.types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' }) export class ConfigService {
  public config: ApiConfigFile | undefined;

  constructor(private _http: HttpClient) {}

  public load(url: string): Observable<any> {
    return this._http.get(url).pipe(map((data: any) => this.config = data));
  }
}
