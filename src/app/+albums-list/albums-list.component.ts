import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsListComponent {
  constructor() {}
}
