import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../_services/data/data.service';
import { SiteMenuOption } from '../_types/response.types';
import { EventsService, ToolService } from '@circe/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../_services/global/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnDestroy {
  public menu: SiteMenuOption[];
  public optionSelected: string;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    public g: GlobalService,
    private _data: DataService,
    private _route: ActivatedRoute,
    private _cd: ChangeDetectorRef
  ) {
    this.menu = [];
    this.optionSelected = '';

    g.urlChanged$.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.optionSelected = _route.snapshot.firstChild!.url[0].path;
      _cd.markForCheck();
    });

    _data.getMenuOptions().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((menu: SiteMenuOption[]) => {
      this.menu = menu;
      _cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
