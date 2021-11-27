import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventsService } from '@circe/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    public ev: EventsService,
    private _router: Router
  ) {}

  public newPost(): void {
    this._router.navigate(['/', 'posts', 'new']).then();
  }
}
