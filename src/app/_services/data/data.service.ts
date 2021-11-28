import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../_config/config.service';
import { OrderConditionPipe } from '@circe/core';
import { GlobalService } from '../global/global.service';
import { combineLatest, Observable } from 'rxjs';
import { Post, PostsData, SiteMenuOption, User } from '../../_types/response.types';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' }) export class DataService extends ApiService {
  constructor(
    public http: HttpClient,
    public zone: NgZone,
    public config: ConfigService,
    public g: GlobalService,
    private _order: OrderConditionPipe
  ) {
    super(http, zone, config);
  }

  public getMenuOptions(): Observable<SiteMenuOption[]> {
    return this.apiGet('menu.json', this.baseSecondaryEndPoint);
  }

  public getPostsData(): Observable<PostsData> {
    return combineLatest([
      this.getPosts(),
      this.getUsers()
    ]).pipe(
      map(([posts, users]: [Post[], User[]]) => {
        return {
          posts: posts.map((p: Post) => {
            const user: User = users.find((u: User) => u.id === p.userId)!;
            return {...p, user};
          }),
          users
        };
      })
    );
  }

  public getPosts(): Observable<Post[]> {
    return this.apiGet('posts');
  }

  public getUsers(): Observable<User[]> {
    return this.apiGet('users');
  }
}
