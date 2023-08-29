import { useEffect, useState } from "react";
import * as Hook from "../../hooks";
import * as RTK from "../../redux";

export const useGetCommunity = () => {

  const categoryList = ["전체", "공지", "자유", "후기"];
  const [category, setCategory] = useState("전체")
  const [pageNum, setPageNum] = useState<number>(1)
  const { getId, onNavigate } = Hook.useRouter();
  const { isLoading, isError, data, error } = Hook.useCommunity({ getId, category })
  const { sub } = RTK.useAppSelector(RTK.selectDecode);
  
  const onCategoryToggle = (kor: string) => () => {
    setCategory(kor)
    onNavigate({ url: `/community/1` })()
  }
  
  useEffect(() => {
    let innerWidth = window.innerWidth
    const onResizw = () => {
      innerWidth = window.innerWidth
    }

    getId === 1
      ? window.scrollTo(0, 0)
      : window.scrollTo(0, 500);

    if(getId !== 1) innerWidth < 1024 && window.scrollTo(0, 1260);
    if (getId) {
      getId === 1
        ? setPageNum(1)
        : getId % 4 === 1
          ? setPageNum(getId)
          : getId % 4 === 2
            ? setPageNum(getId - 1)
            : getId % 4 === 3
              ? setPageNum(getId - 2)
              : setPageNum(getId - 3)
    }

    window.addEventListener("resize", onResizw)
    return () => {
      window.removeEventListener("resize", onResizw )
    }


  }, [getId])


  return {
    // 상태 관련
    categoryList, category, pageNum, sub,
    // Router 관련
    getId, onNavigate,
    // 카테고리 검색관련
    onCategoryToggle,
    // 카테고리별, 비동기 통신
    isLoading, isError, data, error
  }
}