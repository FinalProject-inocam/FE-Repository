export interface Comment {
  comment: string;
}

export interface CommentsData extends Comment {
  comment_id: number;
  nickname: string;
  created_at: string;
  modified_at: string;
}

export interface PostPosts {
  title:string;
  content:string;
  post_id?: number;
}

export interface PostsData extends PostPosts {
  is_like: boolean;
  like_count: number;
  comment_count?: number;
}

export interface PostsDetailData extends PostsData {
  image_urls: string[];
  comment: CommentsData[];
}