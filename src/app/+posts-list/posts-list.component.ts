import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../_services/data/data.service';
import { Post, PostsData, User } from '../_types/response.types';
import { EventsService, NpaOption, ToolService } from '@circe/core';
import { FormControl } from '@angular/forms';
import { GlobalService } from '../_services/global/global.service';
import { Router } from '@angular/router';
import { NpaDropdownConfig } from '@circe/dropdown';

@Component({
  selector: 'app-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnDestroy {
  public posts: Post[];
  public counter: string;

  public loading: boolean;

  public edition: FormControl = new FormControl(this._g.postsEdition);
  public userFilter: FormControl = new FormControl('');

  public showDropdownUsers: boolean;
  public optionsUsers: NpaOption[];
  public readonly usersDropdownConfig: NpaDropdownConfig;
  public dropdownUsersKeyboard$: Subject<KeyboardEvent> = new Subject();

  public showUserModal: boolean;
  public userToShow: User | undefined;

  private _postsSource: Post[];
  private _optionsUsersSource: NpaOption[];
  private readonly _host: HTMLElement;
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    private _data: DataService,
    private _g: GlobalService,
    private _router: Router,
    private _el: ElementRef<HTMLElement>,
    private _cd: ChangeDetectorRef
  ) {
    this._host = _el.nativeElement;
    this.posts = [];
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
    this._postsSource = [];
    this._optionsUsersSource = [];

    _data.getPostsData().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((postsData: PostsData) => {
      this.posts = postsData.posts;
      this._postsSource = [...this.posts];
      this.optionsUsers = postsData.users.map((u: User) => ({ value: u.id, label: u.username }));
      this._optionsUsersSource = [...this.optionsUsers];
      this._setCounter(this.posts.length);
      this.loading = false;
      _cd.markForCheck();
    });

    this.edition.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((edition: boolean) => {
      _g.postsEdition = edition;
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
    this.counter = (numberOfElements > 1) ? `${numberOfElements} posts shown` : `${numberOfElements} post shown`;
  }

  public goEditPost(postId: number): void {
    this._router.navigate(['/', 'post', postId, 'edit']).then();
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
        this.posts = this._postsSource.filter((p: Post) => p.userId === user.value);
        this._setCounter(this.posts.length);
      }
    }
  }

  public clear(event?: MouseEvent): void {
    if (!!event) {
      this.ev.preventNoNeededEvent(event!);
    }
    this.showDropdownUsers = false;
    this.userFilter.setValue('', { emitEvent: false });
    this.posts = [...this._postsSource];
    this._setCounter(this.posts.length);
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
