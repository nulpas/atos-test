import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../_config/config.service';
import { OrderConditionPipe } from '@circe/core';
import { GlobalService } from '../global/global.service';
import { combineLatest, mergeMap, Observable, of } from 'rxjs';
import { Album, AlbumsData, Comment, Photo, Post, PostsData, SiteMenuOption, User } from '../../_types/response.types';
import { catchError, map } from 'rxjs/operators';
import { PostRequest } from '../../_types/request.types';

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

  private static _transformsUser(user: User): User {
    return {
      ...user,
      websiteHref: (!user.website.includes('http')) ? `http://${user.website}` : user.website
    };
  }

  public getMenuOptions(): Observable<SiteMenuOption[]> {
    return this.apiGet('menu.json', this.baseSecondaryEndPoint);
  }

  public getBffPostsData(): Observable<PostsData> {
    return this.apiGet('posts-data', this.baseThirdEndPoint).pipe(
      catchError(() => this.getPostsData())
    );
  }

  public getPostsData(): Observable<PostsData> {
    return combineLatest([
      this.getPosts(),
      this.getUsers(),
      this.getComments()
    ]).pipe(
      map(([posts, usersApi, commentsApi]: [Post[], User[], Comment[]]) => {
        const users: User[] = usersApi.map((u: User) => DataService._transformsUser(u));
        return {
          posts: posts.map((p: Post) => {
            const user: User = users.find((u: User) => u.id === p.userId)!;
            const comments: Comment[] = commentsApi.filter((c: Comment) => c.postId === p.id);
            return { ...p, user, comments };
          }),
          users
        };
      })
    );
  }

  public getPosts(): Observable<Post[]> {
    return this.apiGet('posts');
  }

  public getPostById(postId: number): Observable<Post> {
    return this.apiGet(`posts/${postId}`);
  }

  public getUsers(): Observable<User[]> {
    return this.apiGet('users');
  }

  public getUserById(userId: number): Observable<User> {
    return this.apiGet(`users/${userId}`);
  }

  public getComments(): Observable<Comment[]> {
    return this.apiGet('comments');
  }

  public getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.apiGet(`posts/${postId}/comments`);
  }

  public getBffOnePostData(postId: number): Observable<Post> {
    return this.apiGet(`one-post-data/${postId}`, this.baseThirdEndPoint).pipe(
      catchError(() => this.getOnePostData(postId))
    );
  }

  public getOnePostData(postId: number): Observable<Post> {
    return this.getPostById(postId).pipe(
      mergeMap((post: Post) => combineLatest([
        of(post),
        this.getUserById(post.userId),
        this.getCommentsByPostId(postId)
      ])),
      map(([post, user, comments]: [Post, User, Comment[]]) => ({
        ...post,
        user: DataService._transformsUser(user),
        comments
      }))
    );
  }

  public createPost(body: PostRequest): Observable<Post> {
    return this.apiPost('posts', body);
  }

  public updatePost(postId: number, body: Post): Observable<Post> {
    return this.apiPut(`posts/${postId}`, body);
  }

  public getBffAlbumsData(): Observable<AlbumsData> {
    return this.apiGet('albums-data', this.baseThirdEndPoint).pipe(
      catchError(() => this.getAlbumsData())
    );
  }

  public getAlbumsData(): Observable<AlbumsData> {
    return combineLatest([
      this.getAlbums(),
      this.getUsers(),
      this.getPhotos()
    ]).pipe(
      map(([albums, usersApi, photosApi]: [Album[], User[], Photo[]]) => {
        const users: User[] = usersApi.map((u: User) => DataService._transformsUser(u));
        return {
          albums: albums.map((a: Album) => {
            const user: User = users.find((u: User) => u.id === a.userId)!;
            const photos: Photo[] = photosApi.filter((ph: Photo) => ph.albumId === a.id);
            return { ...a, user, photos };
          }),
          users
        };
      })
    );
  }

  public getAlbums(): Observable<Album[]> {
    return this.apiGet('albums');
  }

  public getAlbumById(albumId: number): Observable<Album> {
    return this.apiGet(`albums/${albumId}`);
  }

  public getPhotos(): Observable<Photo[]> {
    return this.apiGet('photos');
  }

  public getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return this.apiGet(`albums/${albumId}/photos`);
  }

  public getBffOneAlbumData(albumId: number): Observable<Album> {
    return this.apiGet(`one-album-data/${albumId}`, this.baseThirdEndPoint).pipe(
      catchError(() => this.getOneAlbumData(albumId))
    );
  }

  public getOneAlbumData(albumId: number): Observable<Album> {
    return this.getAlbumById(albumId).pipe(
      mergeMap((album: Album) => combineLatest([
        of(album),
        this.getUserById(album.userId),
        this.getPhotosByAlbumId(albumId)
      ])),
      map(([album, user, photos]: [Album, User, Photo[]]) => ({
        ...album,
        user: DataService._transformsUser(user),
        photos
      }))
    );
  }
}
