import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../_types/response.types';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  @Input() user: User | undefined;

  constructor() {}
}
