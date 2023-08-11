/* / Community 관련 타입 / -------------------------------------------------------- */
export interface Community {
  title:string;
  content:string;
  postId?: number;
}

export interface TotalCommunity extends Community {
  isLike: boolean;
  likeCount: number;
  commentCount?: number;
}

export interface CommunityComments {
  commentId: number;
  comment: string;
  nickname: string;
  createdAt: string;
  modifiedAt: string;
}

export interface DetailCommunity extends TotalCommunity {
  imageUrls: string[];
  commentsList: CommunityComments[];
}

/* / WrappingShop 관련 타입 / -------------------------------------------------------- */
export interface WrappingShop {
	avgStar: number;
	isLike: boolean;
	latitude: number;
	like_count: number;
	lnoAdr: string;
	longitude: number;
	rdnmAdr: string;
	shopId: string;
	shopName: string;
}

export interface WrappingShopReview {
	star: number;
	review: string;
}

export interface TotalWrappingShopReview extends WrappingShopReview {
	createAt: string;
	imageUrls: string[];
	modifiedAt: string;
	nickname: string;
	reviewId: number;
}
