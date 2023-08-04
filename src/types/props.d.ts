export interface FigureImg {
  src: string;
  alt: string;
  width: string;
  height?: string;
}

export interface EditComment {
  postId: number | undefined;
  commentId: number;
  comment: string;
}