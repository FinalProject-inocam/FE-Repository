export interface FigureImg {
  src: string;
  alt: string;
  width: string;
  height?: string;
}

export interface EditComment {
  post_id: number | undefined;
  comment_id: number;
  comment: string;
}