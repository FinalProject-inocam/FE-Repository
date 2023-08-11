import { ChangeEvent, Dispatch, FormEvent } from "react";
import { Community, DetailCommunity } from "../data";
import { CarOrderInfo } from "../carOrder";

/* / 00 AsyncDefaultType / -------------------------------------------------------- */
interface AsyncHooksDefault {
  isLoading: boolean;
  isError:boolean;
  error: string | unknown; // 통신전에는 unknown & 통신후에는 string
  getId?: number | undefined;
  onNavigate?: (path: string | number) => () => void;
}

/* / 01 KakaoMapsAPI를 위한 declare 선언 / -------------------------------------------------------- */
declare global {
  interface Window {
    kakao: any;
  }
}

/* / 02 useGeolocation / -------------------------------------------------------- */
export interface useGeolocation {
  lat:number;
  long:number;
}

/* / 03 useCommunity / -------------------------------------------------------- */
interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface CommunityData {
  content: TotalCommunity[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number:number;
  numberOfElements: number;
  pageable:{
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean
  }
  size:number
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface useCommunity extends AsyncHooksDefault {  
  data:CommunityData;
}

/* / 04 useCommunityDetail / -------------------------------------------------------- */
export interface useCommunityDetail extends AsyncHooksDefault {
  data:DetailCommunity;
  commentInfo: string;
  onDeletePost:(post_id: number | undefined) => () => void;
  onSubmitPostComment:(post_id: number | undefined) => (e: FormEvent<HTMLFormElement>) => void;
  onChangeComment:(e: ChangeEvent<HTMLInputElement>)=> void;
  onDeleteComment:(post_id: number | undefined, comment_id: number | undefined) => () => void;
}

/* / 05 useCommunityWrite / -------------------------------------------------------- */
export interface useCommunityWirte {
  postInfo: Community;
  onChangePost: (e: ChangeEvent<HTMLInputElement>) => void;
  onChageFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void> 
  onSubmitPostPosts: (e:FormEvent<HTMLFormElement>) => void;
}

/* / 06 useInnoCarOrder / -------------------------------------------------------- */
export interface useInnoCarOrder {
  carOrderInfo:CarOrderInfo;
  setOpenDaumPost:Dispatch<SetStateAction<boolean>>;
  openDaumPost:boolean;
  onSubmitCarOrder:(e: FormEvent<HTMLFormElement>) => void;
  onChangeCarOrderInfo:(e: ChangeEvent<HTMLInputElement>) => void;
  handleComplete:(data:any) => void;
}