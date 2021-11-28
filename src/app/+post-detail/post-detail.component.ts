import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { EventsService, ToolService } from '@circe/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../_services/data/data.service';
import { Post } from '../_types/response.types';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent implements OnDestroy {
  public post: Post | undefined;
  public loading: boolean;

  private readonly _idToShow: number | undefined;
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    private _data: DataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cd: ChangeDetectorRef
  ) {
    this.loading = true;
    this._idToShow = _route.snapshot.params['id'];

    if (!!this._idToShow) {
      _data.getOnePostData(this._idToShow).pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((post: Post) => {
        this.post = post;
        this.loading = false;
        _cd.markForCheck();
      });
    }
  }

  public goPostsList(): void {
    this._router.navigate(['/', 'posts']).then();
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
