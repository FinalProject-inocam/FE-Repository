export interface ShopDataType {
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

export interface ShopPostComment {
	star: number;
	review: string;
}

export interface ShopPatchComment {
	shopId: string | undefined;
	reviewId: number;
}

export interface ShopComment extends ShopPostComment {
	createAt: string;
	imageUrls: string[];
	modifiedAt: string;
	nickname: string;
	reviewId: number;
}

export interface ShopCommentProps {
	shopId: string;
}
