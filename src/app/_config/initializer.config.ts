import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiConfigFile } from '../_types/app.types';
import { Observable } from 'rxjs';

export function getConfigJson(config: ConfigService): () => Observable<ApiConfigFile> {
  return () => config.load('./assets/config.json');
}

export const INITIALIZER: any = {
  provide: APP_INITIALIZER,
  useFactory: getConfigJson,
  deps: [ConfigService],
  multi: true
};
