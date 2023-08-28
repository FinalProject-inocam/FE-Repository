import { FC, MouseEvent, useEffect, useState } from "react"
import * as SC from "../../components";
import { communityBanner, heart, posting, searchIcon } from "../../assets";
import { useCommunity, useRouter } from "../../hooks";


export const GetCommunity: FC = () => {
  const { getId, onNavigate } = useRouter();
  const [category, setCategory] = useState("전체")
  const { isLoading, isError, data, error } = useCommunity({ getId })
  const [pageNum, setPageNum] = useState<number>(1)

  const onCategoryToggle = (e:MouseEvent) => {
    const { innerText } = e.target as HTMLElement
    setCategory(innerText)
  }

  console.log(category, setCategory)
  const categoryList = ["전체", "공지", "자유", "후기"];

  useEffect(() => {
    getId === 1 
      ? window.scrollTo(0, 0)
      : window.scrollTo(0, 500);

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
  }, [getId])

  data && console.log("GetCommunity", data)

  // darkBlue2 // white
  return (
    <SC.FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
      <SC.FlexBox $gap={10}>
        {categoryList.map(list => {
          const bColor = category === list ? "darkBlue2": "white";
          return (<SC.CategoryBtn 
                      key={list} 
                      onClick={onCategoryToggle} 
                      $bColor={bColor} 
                      children={<SC.CustomP $height="44px" $bColor={bColor} children={list}/>} />)
        })}
      </SC.FlexBox>

      <SC.PostList $gap={10}>
        {isLoading
          ? (<div>로딩 중...</div>)
          : isError
            ? (<div>error... {JSON.stringify(error)}</div>)
            : (<>
              {Array.from({ length: 10 }).map((_, idx: number) => (
                <SC.PostInnerItem key={idx} onClick={onNavigate({ url: '/community/review/1' })}>
                  <SC.FigureObjectFitImg width={"100%"} height={"150px"} src={communityBanner} alt="mainLogo" />
                  <SC.PostInnerContext>
                    <SC.CategoryBtn $bColor="lightgray1" $types="PostTag"><SC.CustomP $height="34px" $bColor="lightgray1">태그</SC.CustomP></SC.CategoryBtn>
                    <SC.FlexBox $fd="column" $gap={8} $ai="start" $jc="start">
                      <SC.PostingText $height="34px" ><p>공지는 하나만 등록할 수 있고 맨위에 고정되어요~</p></SC.PostingText>
                      <SC.PostingText $height="24px" ><p>커뮤니티에서는 올바른 말과 행동..</p></SC.PostingText>
                      <div>관리자 조회수 9562 2023. 12. 31</div>
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5} style={{ width: "150px", height: "40px", position: "absolute", bottom: "10px", right: "15px" }}>
                      <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={heart} alt="heart" />
                      <p>1,024</p>
                      <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={posting} alt="posting" />
                      <p>92</p>
                    </SC.FlexBox>
                  </SC.PostInnerContext>
                </SC.PostInnerItem>
              ))}
            </>)}
      </SC.PostList>
      <SC.FlexBox $jc="space-between" style={{ width: "100%" }}>
        <SC.PositionRelavite>
          <SC.SearchBar type="text" placeholder="검색어를 입력하세요..." />
          <img
            src={searchIcon}
            alt="searchIcon"
            style={{ display: "block", cursor: "pointer", position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)" }}></img>
        </SC.PositionRelavite>
        <SC.FlexBox $gap={10}>
          <SC.SettingsBtn $bColor="lightgray2">삭제(관리자)</SC.SettingsBtn>
          <SC.SettingsBtn $bColor="orange2">선택(관리자)</SC.SettingsBtn>
          <SC.SettingsBtn onClick={onNavigate({ url: '/community/write' })} $bColor="blue">글 작성하기</SC.SettingsBtn>
        </SC.FlexBox>
      </SC.FlexBox>
      <SC.FlexBox $gap={30} style={{ margin: "0 auto" }}>
        <SC.RankNum $bColor="lightgray3" onClick={onNavigate({ url: `/community/${getId && getId - 1}` })} children={<p children={`<`} />} />
        <SC.FlexBox $gap={10}>
          {pageNum !== 1 && <SC.RankNum $bColor="lightgray2" onClick={onNavigate({ url: `/community/${pageNum - 4}` })} children={<p children="..." />} />}
          {Array
            .from({ length: 5 }, (_, idx) => idx)
            .map(list => <SC.RankNum 
                    key={list} 
                    $bColor={getId === pageNum + list ? `blue` : 'lightgray2'} 
                    onClick={onNavigate({ url: `/community/${pageNum + list}` })} 
                    children={<p children={list === 4 ? "..." : `${pageNum + list}`} />} />)}
          {/* {data && Array
            .from({ length: 5 }, (_, idx) => idx)
            .map(list => data.totalPages >= pageNum + list 
              && <SC.RankNum 
                    key={list} 
                    $bColor={getId === pageNum + list ? `blue` : 'lightgray2'} 
                    onClick={onNavigate({ url: `/community/${pageNum + list}` })} 
                    children={<p children={list === 4 ? "..." : `${pageNum + list}`} />} />)} */}
        </SC.FlexBox>
        <SC.RankNum $bColor="lightgray3" onClick={onNavigate({ url: `/community/${getId && getId + 1}` })} children={<p children={`>`} />} />
      </SC.FlexBox>

    </SC.FlexBox>
  )
}