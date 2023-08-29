import { FC } from "react"
import * as Hook from "../../hooks";
import * as ASS from "../../assets";
import * as SC from "../../components";

export const GetCommunity: FC = () => {
  const {
    categoryList, category, pageNum, sub, // 상태 관련
    onNavigate, // Router 관련
    onCategoryToggle, // 카테고리 검색관련
    isLoading, isError, data, error // 카테고리별, 비동기 통신
  } = Hook.useGetCommunity()

  return (
    <SC.FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
      {/* 카테고리 조회리스트 */}
      <SC.FlexBox $gap={10}>
        {categoryList.map(kor => {
          const bColor = category === kor ? "darkBlue2" : "white";
          return (<SC.CategoryBtn
            key={kor}
            onClick={onCategoryToggle(kor)}
            $bColor={bColor}
            children={<SC.CustomP $height="44px" $bColor={bColor} children={kor} />} />)
        })}
      </SC.FlexBox>

      {/* GetCommunityReview 리스트, 현재 10개씩 */}
      <SC.PostList $gap={10}>
        {isLoading
          ? (<div>로딩 중...</div>)
          : isError
            ? (<div>error... {JSON.stringify(error)}</div>)
            : data.content.map(({ postId, thumbnail, category, title, content, nickname, view, createAt, isLike, likeCount, commentCount }: any) => (
              <SC.GetCommunityReview
                key={postId}
                data={{ postId, thumbnail, category, title, content, nickname, view, createAt, isLike, likeCount, commentCount }}
              />
            ))}
      </SC.PostList>

      {/* 검색관련 설정태그 */}
      <SC.FlexBox $jc="space-between" style={{ width: "100%" }}>
        <SC.PositionRelavite>
          <SC.SearchBar type="text" placeholder="검색어를 입력하세요..." />
          <SC.SearchIcons src={ASS.searchIcon} alt="searchIcon" />
        </SC.PositionRelavite>
        <SC.FlexBox $gap={10}>
          {sub === "E001" && (<>
            <SC.SettingsBtn $bColor="lightgray2">삭제</SC.SettingsBtn>
            <SC.SettingsBtn $bColor="orange">선택</SC.SettingsBtn>
          </>)}
          <SC.SettingsBtn onClick={onNavigate({ url: '/community/write' })} $bColor="blue">글 작성하기</SC.SettingsBtn>
        </SC.FlexBox>
      </SC.FlexBox>

      {/* 페이지네이션 관련 부분 */}
      <SC.PageNation pageNum={pageNum} />
    </SC.FlexBox>
  )
}