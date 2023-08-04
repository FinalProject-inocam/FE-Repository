export interface Comment {
  comment: string;
}

export interface CommentsData extends Comment {
  commentId: number;
  nickname: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PostPosts {
  title:string;
  content:string;
  postId?: number;
}

export interface PostsData extends PostPosts {
  isLike: boolean;
  likeCount: number;
  commentCount?: number;
}

export interface PostsDetailData extends PostsData {
  imageUrls: string[];
  commentsList: CommentsData[];
}