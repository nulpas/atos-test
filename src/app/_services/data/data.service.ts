import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../_config/config.service';
import { OrderConditionPipe } from '@circe/core';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';
import { SiteMenuOption } from '../../_types/response.types';

@Injectable({ providedIn: 'root' }) export class DataService extends ApiService {
  constructor(
    public http: HttpClient,
    public zone: NgZone,
    public config: ConfigService,
    public g: GlobalService,
    private _order: OrderConditionPipe
  ) {
    super(http, zone, config);
  }

  public getMenuOptions(): Observable<SiteMenuOption[]> {
    return this.apiGet('menu.json', this.baseSecondaryEndPoint);
  }
}
