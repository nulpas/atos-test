import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from '../_types/response.types';
import { DataService } from '../_services/data/data.service';
import { SelectConfig } from '@circe/select';
import { EventsService, NpaOption } from '@circe/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../_services/data/notifications.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFormComponent implements OnDestroy {
  public edition: boolean;
  public post: Post | undefined;
  public loading: boolean;

  public selectConfiguration: SelectConfig;
  public optionsUsers: NpaOption[];

  public titleErrorMessage: string;
  public bodyErrorMessage: string;

  public postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required])
  });

  private readonly _requiredText: string;
  private readonly _idToEdit: number | undefined;
  private readonly _host: HTMLElement;
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    public ev: EventsService,
    private _data: DataService,
    private _not: NotificationsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _el: ElementRef<HTMLElement>,
    private _cd: ChangeDetectorRef
  ) {
    this._host = _el.nativeElement;
    this._idToEdit = _route.snapshot.params['id'];
    this.loading = true;
    this.edition = !!this._idToEdit;
    this.selectConfiguration = {
      dropdownRelativeElement: this._host,
      checkAvailableSpace: true
    };
    this.optionsUsers = [];
    this.titleErrorMessage = '';
    this.bodyErrorMessage = '';
    this._requiredText = 'This field is required.';

    if (!!this._idToEdit) {
      _data.getPostById(this._idToEdit).pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((post: Post) => {
        setTimeout(() => {
          this.post = post;
          this.postForm.get('title')?.setValue(post.title);
          this.postForm.get('body')?.setValue(post.body);
          this.postForm.get('userId')?.setValue(post.userId);
          this.loading = false;
          _cd.markForCheck();
        });
      });
    }

    _data.getUsers().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((users: User[]) => {
      this.optionsUsers = users.map((u: User) => ({ value: u.id, label: u.username }));
      if (!this.edition) {
        this.loading = false;
      }
      this._cd.markForCheck();
    });

    this.postForm.get('title')?.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.titleErrorMessage = '';
      if (this.postForm.get('title')?.invalid) {
        this.titleErrorMessage = this._requiredText;
      }
      _cd.markForCheck();
    });

    this.postForm.get('body')?.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.bodyErrorMessage = '';
      if (this.postForm.get('body')?.invalid) {
        this.bodyErrorMessage = this._requiredText;
      }
      _cd.markForCheck();
    });
  }

  public submit(): void {
    const _call: Observable<Post> = (this.edition) ?
      this._data.updatePost(this._idToEdit!, { ...this.postForm.value, id: this._idToEdit }) :
      this._data.createPost(this.postForm.value);
    _call.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((post: Post) => {
      this._not.triggerNotification$.next({
        notification: {
          message: `Post <span class="npa--bold">${post.title}</span> was ${(this.edition) ? 'updated' : 'created'} successfully.`,
          type: 'success'
        },
        timeout: 250
      });
      this._router.navigate(['/', 'posts']).then();
    });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
