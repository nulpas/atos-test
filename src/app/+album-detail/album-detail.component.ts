import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  constructor() {}
}
