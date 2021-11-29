import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { EventsService, ToolService } from '@circe/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album, Photo, Post } from '../_types/response.types';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../_services/data/data.service';
import { ModalConfig, ModalSizesKeys, modalTypes } from '@circe/modal';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent implements OnDestroy {
  public album: Album | undefined;
  public loading: boolean;

  public showImageModal: boolean;
  public imageModalConfig: ModalConfig;
  public photoToDetail: Photo | undefined;

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
    this.showImageModal = false;
    this.imageModalConfig = {
      type: modalTypes.custom,
      height: 700,
      size: ModalSizesKeys.medium
    };
    this._idToShow = _route.snapshot.params['id'];

    if (!!this._idToShow) {
      _data.getBffOneAlbumData(this._idToShow).pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((album: Album) => {
        this.album = album;
        this.loading = false;
        _cd.markForCheck();
      });
    }
  }

  public goAlbumsList(): void {
    this._router.navigate(['/', 'albums']).then();
  }

  public closeImageModal(): void {
    this.showImageModal = false;
    this.photoToDetail = undefined;
    this._cd.markForCheck();
  }

  public showThisPhoto(photo: Photo): void {
    this.photoToDetail = photo;
    this.showImageModal = true;
    this._cd.markForCheck();
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
