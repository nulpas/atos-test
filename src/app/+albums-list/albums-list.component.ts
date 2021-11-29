import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventsService, NpaOption, ToolService } from '@circe/core';
import { NpaDropdownConfig } from '@circe/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { Album, AlbumsData, User } from '../_types/response.types';
import { DataService } from '../_services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsListComponent implements OnDestroy {
  public albums: Album[];
  public counter: string;

  public loading: boolean;

  public userFilter: FormControl = new FormControl('');

  public showDropdownUsers: boolean;
  public optionsUsers: NpaOption[];
  public readonly usersDropdownConfig: NpaDropdownConfig;
  public dropdownUsersKeyboard$: Subject<KeyboardEvent> = new Subject();

  public showUserModal: boolean;
  public userToShow: User | undefined;

  private _albumsSource: Album[];
  private _optionsUsersSource: NpaOption[];
  private readonly _host: HTMLElement;
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    private _data: DataService,
    private _router: Router,
    private _el: ElementRef<HTMLElement>,
    private _cd: ChangeDetectorRef
  ) {
    this._host = _el.nativeElement;
    this.albums = [];
    this.counter = 'No posts shown';
    this.loading = true;
    this.showDropdownUsers = false;
    this.optionsUsers = [];
    this.usersDropdownConfig = {
      elementReference: { name: 'user-filter', type: 'id' },
      elementRelative: this._host,
      type: 'select',
      checkImage: false
    };
    this.showUserModal = false;
    this._albumsSource = [];
    this._optionsUsersSource = [];

    _data.getBffAlbumsData().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((albumsData: AlbumsData) => {
      this.albums = albumsData.albums;
      this._albumsSource = [...this.albums];
      this.optionsUsers = albumsData.users.map((u: User) => ({ value: u.id, label: u.username }));
      this._optionsUsersSource = [...this.optionsUsers];
      this._setCounter(this.albums.length);
      this.loading = false;
      _cd.markForCheck();
    });

    this.userFilter.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((changes: string) => {
      if (!this.showDropdownUsers) {
        this.showDropdownUsers = true;
      }
      this.optionsUsers = this._optionsUsersSource.filter((o: NpaOption) => o.label?.toLowerCase().includes(changes.toLowerCase()));
      if (!this.optionsUsers.length) {
        this.optionsUsers.push({ value: '', label: 'No results match' });
      }
      if (!changes) {
        this.clear();
      }
    });
  }

  private _setCounter(numberOfElements: number): void {
    this.counter = (numberOfElements > 1) ? `${numberOfElements} albums shown` : `${numberOfElements} album shown`;
  }

  public triggerUsersDropdown(): void {
    this.showDropdownUsers = !this.showDropdownUsers;
  }

  public filterByUser(user: NpaOption | NpaOption[]): void {
    if (!Array.isArray(user)) {
      const _filterValue: string = (!!user.value) ? user.label! : '';
      this.optionsUsers = [...this._optionsUsersSource];
      this.userFilter.setValue(_filterValue, { emitEvent: false });
      if (!!user.value) {
        this.albums = this._albumsSource.filter((a: Album) => a.userId === user.value);
        this._setCounter(this.albums.length);
      }
    }
  }

  public clear(event?: MouseEvent): void {
    if (!!event) {
      this.ev.preventNoNeededEvent(event!);
    }
    this.showDropdownUsers = false;
    this.userFilter.setValue('', { emitEvent: false });
    this.albums = [...this._albumsSource];
    this._setCounter(this.albums.length);
  }

  public closeUserModal(): void {
    this.userToShow = undefined;
    this.showUserModal = false;
    this._cd.markForCheck();
  }

  public showThisUser(user: User | undefined): void {
    if (!!user) {
      this.userToShow = user;
      this.showUserModal = true;
      this._cd.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
