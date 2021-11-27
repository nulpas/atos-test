import { Injectable } from '@angular/core';
import { ConfigService } from '../../_config/config.service';
import { ApiConfigFile } from '../../_types/app.types';
import { BehaviorSubject } from 'rxjs';
import { NpaColor } from '@medea/atos-test/colors';

@Injectable({ providedIn: 'root' }) export class GlobalService {
  public updateDate: string;

  public urlChanged$: BehaviorSubject<boolean> = new BehaviorSubject(true as boolean);

  public appLanguage: 'en_US' | 'es_ES' = 'en_US';

  private readonly _defaultColorOpacity: number;
  private readonly _env: ApiConfigFile;

  constructor(private _config: ConfigService) {
    this._env = _config.config as ApiConfigFile;
    this.updateDate = this._env.DATE_DEPLOY;
    this._defaultColorOpacity = 0.6;
  }

  public getTransparentColor(color: NpaColor, opacity?: number): string {
    return `rgba(${color.rgb}, ${opacity || this._defaultColorOpacity})`;
  }

  public toBase64(thing: string): string {
    return window.btoa(thing);
  }

  public fromBase64(base: string): string {
    return window.atob(base);
  }
}
