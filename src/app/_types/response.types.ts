export type SiteMenuOption = {
  id: string;
  name: string;
  location: string[];
};

export type PostsData = {
  posts: Post[];
  users: User[];
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comment[];
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  websiteHref?: string;
  company: Company;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Geo = {
  lat: string;
  lng: string;
}

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
