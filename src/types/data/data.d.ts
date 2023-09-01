/* / Community 관련 타입 / -------------------------------------------------------- */
export interface Community {
	title: string;
	content: string;
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
	nickname?: string;
	commentsList: CommunityComments[];
}

/* / WrappingShop 관련 타입 / -------------------------------------------------------- */
export interface WrappingShop {
	currentPage: number;
	first: boolean;
	last: boolean;
	shopList: ShopList[];
	size: number;
	totalCount: number;
	totalElements: number;
	totalPages: number;
}

export interface ShopList {
	avgStar: number;
	isLike: boolean;
	latitude: number;
	likeCount?: number;
	longitude: number;
	rdnmAdr?: string;
	shopId: string;
	shopName: string;
	reviewCount: number;
}

export interface WrappingShopDetail extends ShopList {
	address: string;
	banner: string[];
	reviews: Review[];
	reviewImageSize: number;
	reviewCount: number;
	totalElements: number;
}

export interface TotalWrappingShopReview extends WrappingShopReview {
	createAt: string;
	imageUrls: string[];
	modifiedAt: string;
	nickname: string;
	reviewId: number;
	revisit: boolean;
	star: number;
	review: string;
}

/* / DecodeToken 관련 타입 : Redux 및 ??  / -------------------------------------------------------- */
export interface DecodeToken {
	sub: string;
	auth: string;
	nickname: string;
	gender: string;
	exp: number;
	iat: number;
}

/* / Auth 관련 타입 / -------------------------------------------------------- */
export type User = {
	email: string;
	password: string;
};

export type UserInfo = UserType & {
	nickname: string;
	phone_number: string;
	isAdmin: boolean;
	admincode: string;
};

export type UserInfoCheckPW = UserInfoType & {
	pwChecked: string;
};

export type ValiditeMsg = {
	validteEmail: [string, boolean];
	validtepassword: [string, boolean];
	passwordChMsg: [string, boolean];
};

/* / carOrder 관련 타입 / -------------------------------------------------------- */
export interface CarOrderInfo {
	type: string;
	color: string;
	alarm: boolean;
	content: string;
	addressName: string;
	zoneNo: string;
}

export interface CarOrderRes extends CarOrderInfo {
	purchaseId: number;
}

/* / purchasesChart 관련 타입 / -------------------------------------------------------- */

interface NotificationArr {
	purchase: number[];
	approve: number[];
	cancel: number[];
}

interface NotificationNum {
	purchase: number;
	approve: number;
	cancel: number;
}

interface Gender {
	gender: { byGender: number[]; ratio: number[] };
}

interface Age {
	age: { byAge: number[]; ratio: number[] };
}

interface PurchasesGet extends NotificationArr, Gender, Age {}

interface PurchasesGetData {
	total: PurchasesGet;
	model1: PurchasesGet;
	model2: PurchasesGet;
}

interface PurchasesPreData {
	total: NotificationNum;
	model1: NotificationNum;
	model2: NotificationNum;
}

export interface PurchasesChartYear extends PurchasesGetData {
	preYear: PurchasesPreData;
}

export interface PurchasesChartMonth extends PurchasesGetData {
	preMonth: PurchasesPreData;
}

export interface PurchasesChartWeek extends PurchasesGetData {
	preWeek: PurchasesPreData;
}

/* / myPage 관련 타입 / -------------------------------------------------------- */

export interface MyPageData {
	profileImg: string;
	nickname: string;
	phoneNumber: string;
}

export interface MyPageEditData extends MyPageData {
	password: string;
	newPassword: string;
	newPWChecked: string;
}
