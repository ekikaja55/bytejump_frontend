// lib/types/post.ts
export interface SinglePost {
  id: string | null;
  post_title: string | null;
  post_author: string | null;
  post_short_desc: string | null;
  post_banner: string | null;
  post_long_desc: string | null;
  post_view: number | 0;
  createdAt:string |null;
  updatedAt:string |null;
  deletedAt:string |null;

}

export interface PostType {
  posts: SinglePost[],
  message: string | null;
  loading: boolean;
}

export const postState: PostType = {
  posts: [],
  message: null,
  loading: false
}
