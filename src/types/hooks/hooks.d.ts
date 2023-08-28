import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MutableRefObject,
  LegacyRef,
} from "react";
import * as Type from "../data";
import { CarOrderInfo } from "../carOrder";

/* / 00 KakaoMaps declare / -------------------------------------------------------- */
declare global {
  interface Window {
    kakao: any;
  }
}

export interface Native {
  url: string;
  opts?: any;
}

/* / 01 AsyncDefaultType / -------------------------------------------------------- */
interface AsyncHooksDefault {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: string | unknown; // 통신전에는 unknown & 통신후에는 string
  getId?: number | undefined;
  onNavigate?: (Native) => () => void;
}

/* / 02 useGeolocation / -------------------------------------------------------- */
export interface UseGeolocation {
  lat: number;
  long: number;
}

/* / 03 useCommunity / -------------------------------------------------------- */
interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface CommunityData {
  content: Type.TotalCommunity[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
  };
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface UseCommunity extends AsyncHooksDefault {
  data: CommunityData;
}

/* / 04 useCommunityDetail / -------------------------------------------------------- */
export interface UseCommunityDetail extends AsyncHooksDefault {
  data: Type.DetailCommunity;
  commentInfo: string;
  onDeletePost: (post_id: number | undefined) => () => void;
  onSubmitPostComment: (
    post_id: number | undefined
  ) => (e: FormEvent<HTMLFormElement>) => void;
  onChangeComment: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteComment: (
    post_id: number | undefined,
    comment_id: number | undefined
  ) => () => void;
}

/* / 05 useCommunityWrite / -------------------------------------------------------- */
export interface UseCommunityWirte {
  postInfo: Type.Community;
  onChangePost: (e: ChangeEvent<HTMLInputElement>) => void;
  onChageFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSubmitPostPosts: (e: FormEvent<HTMLFormElement>) => void;
}

/* / 06 useInnoCarOrder / -------------------------------------------------------- */
export interface UseInnoCarOrder {
  carOrderInfo: CarOrderInfo;
  setOpenDaumPost: Dispatch<SetStateAction<boolean>>;
  openDaumPost: boolean;
  onSubmitCarOrder: (e: FormEvent<HTMLFormElement>) => void;
  onChangeCarOrderInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleComplete: (data: any) => void;
}

/* / 07 useWrapping / -------------------------------------------------------- */
export interface UseWrapping extends AsyncHooksDefault {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  data: Type.WrappingShop[] | undefined;
}

/* / 08 useWrappingDetail / -------------------------------------------------------- */
export interface UseWrappingDetail extends AsyncHooksDefault {
  data: any;
  review: String;
  star: number;
  onSubmitShopComment: (e: FormEvent<HTMLFormElement>) => void;
  onChangeShopComment: (e: ChangeEvent<HTMLInputElement>) => void;
  onChageShopFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDeleteShopComment: (
    shopId: string | undefined,
    reviewId: number | undefined
  ) => () => void;
  handleRevisitChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/* / 09 useHome / -------------------------------------------------------- */
export interface UseHome {
  sectionRef1: MutableRefObject<HTMLDivElement | null>;
  sectionRef2: MutableRefObject<HTMLDivElement | null>;
  sectionRef3: MutableRefObject<HTMLDivElement | null>;
  sectionRef4: MutableRefObject<HTMLDivElement | null>;
  sectionRef5: MutableRefObject<HTMLDivElement | null>;
  sectionContentRef: MutableRefObject<HTMLDivElement | null>;
  videoUrl: string;
}

export interface UseHeadScroll {
  scrolly: number;
  innerHeight: number;
  preScrolly: boolean;
  isTop: boolean;
}

/* / 10 useEditUser / -------------------------------------------------------- */
export interface UseEditUser extends AsyncHooksDefault {
  edit: boolean;
  userInfo: Type.MyPageEditData;
  onToggleEdit: () => void;
  onSubmitPatchUserInfo: (e: FormEvent<HTMLFormElement>) => void;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChangeUserInfo: (e: ChangeEvent<HTMLInputElement>) => void;
}

/* / 11 useWrappingMap / -------------------------------------------------------- */
export interface UseWrappingMap {
  mapRef: MutableRefObject<HTMLDivElement | null>;
}
/* / 12 useLogin / -------------------------------------------------------- */
export interface UseLogin extends AsyncHooksDefault {
  loginInfo: Type.User;
  data: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitLogin: (e: FormEvent<HTMLFormElement>) => void;
  onSnsLogin: (sns: string) => () => void;
}

/* / 13 useCheckEmailCodeTimer / -------------------------------------------------------- */
export interface UseCheckEmailCodeTimer {
  time: number;
  sec: string;
  min: number;
}

/* / 14 useSignup / -------------------------------------------------------- */
export interface UseSignup {
  inputRef1: LegacyRef<HTMLInputElement> | undefined;
  inputRef2: LegacyRef<HTMLInputElement> | undefined;
  inputRef3: LegacyRef<HTMLInputElement> | undefined;
  inputRef4: LegacyRef<HTMLInputElement> | undefined;
  inputRef5: LegacyRef<HTMLInputElement> | undefined;
  inputRef6: LegacyRef<HTMLInputElement> | undefined;
  inputRef7: LegacyRef<HTMLInputElement> | undefined;
  submitted: boolean;
  check: boolean;
  onSubmitSign: (e: FormEvent<HTMLFormElement>) => void;
}

// export interface UseSignup extends AsyncHooksDefault {
// 	signInfo: Type.UserInfoCheckPW;
// 	certificateEmail: boolean;
// 	checkCode: string;
// 	validiteMsg: Type.ValiditeMsg;
// 	showPW: boolean;
// 	onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
// 	onSubmitSign: (e: FormEvent<HTMLFormElement>) => void;
// 	onCheckEmail: () => void;
// 	onCheckNickName: () => void;
// 	onCertificateEmail: () => void;
// 	onChangeCheckCode: (e: ChangeEvent<HTMLInputElement>) => void;
// 	onClickCheckCode: () => void;
// 	onClickShowPW: () => void;
// }

/* / 15 useLogout / -------------------------------------------------------- */
export interface UseLogout {
  sub: string | undefined;
  onLogout: () => void;
}

/* / 16 useMainHeader / -------------------------------------------------------- */
interface AuthNav {
  noPermission: string[][];
  users: string[][];
  admin: string[][];
}
export interface UseMainHeader {
  scrolly: UseHeadScroll;
  SplashScreenRef: MutableRefObject<HTMLDivElement | null>;
  hanbagerToggle: boolean;
  setHanbagerToggle: Dispatch<React.SetStateAction<boolean>>;
  sideBarNav: string[][];
  authNav: AuthNav;
  onHanbagerToggle: () => void;
  onNaigateSidebarToggle: ({ url, opts }: Native) => () => void;
  onNavigate: (Native) => () => void;
  pathname: string;
}

/* / 17 useRouter / -------------------------------------------------------- */
export interface UseRouter {
  getId: number | undefined;
  pathname: string;
  state: string;
  onNavigate: (Native) => () => void;
}

export interface WrappingShopDetailButtons {
  PositiveButton: (props) => void;
  NagativeButton: (props) => void;
  SubmitButton: (props) => void;
  UploadButton: (props) => void;
}

/* / 17 useRouter / -------------------------------------------------------- */
interface ReviewSliceType {
	revisit: number;
	review: string;
	star: number;
}

/* / 18 useRevisitRadio / -------------------------------------------------------- */
interface ReviewRadioType {
	getRevisit: number | null;
	onChangeRevisit: (e: ChangeEvent<HTMLInputElement>) => void;
}

/* / 19 useReviewForm / -------------------------------------------------------- */
interface UseReviewFormReturnType {
	compressed: boolean;
	previewImg: (string | ArrayBuffer | null)[];
	setPreviewImg: React.Dispatch<React.SetStateAction<(string | ArrayBuffer | null)[]>>;
	setCompressedImg: React.Dispatch<React.SetStateAction<File[] | null>>;

	setCompressed: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmitReview: (e: FormEvent<HTMLFormElement>) => void;
}

/* / 20 useReviewForm / -------------------------------------------------------- */
interface UsePrevImageProps {
	setPreviewImg: React.Dispatch<React.SetStateAction<(string | ArrayBuffer | null)[]>>;
	setState: React.Dispatch<React.SetStateAction<File[] | null>>;
	setCompressed: React.Dispatch<React.SetStateAction<boolean>>;
}

/* / 21 useStarPointer / -------------------------------------------------------- */
interface UseStarPointer {
	getStar: number;
	onChangeStart: (count: number) => () => void;
}

/* / 22 useReviewLike / -------------------------------------------------------- */
interface UseReviewLike {
	onDeleteShopComment: (shopId: string | undefined, reviewId: number | undefined) => void;
	formatDate: (dateString: string) => string;
	currentUser: string;
}
