import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlobalService } from '../_services/global/global.service';

@Component({
  selector: 'app-blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogLayoutComponent {
  constructor(public g: GlobalService) {}
}
