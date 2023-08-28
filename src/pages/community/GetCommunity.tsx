import { FC, useEffect, useState } from "react"
import * as SC from "../../components";
import { heart, heartg, posting, searchIcon } from "../../assets";
import { useCommunity, useDebounce, useRouter } from "../../hooks";
import { useGetCommunitesListQuery, usePatchCommunityLikedMutation } from "../../redux";
import { PerDiv } from "./CommunityDetail";
import { styled } from "styled-components";


const LikeBox:FC<any> = ({postId, isLike, likeCount}) => {
  const [onPatchLiked] = usePatchCommunityLikedMutation()
  const onDebounce = useDebounce(onPatchLiked, postId)
  
  return (
  <div onClick={onDebounce}>
    <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={isLike ? heart : heartg} alt="heart" />
    <p>{likeCount}</p>
  </div>)
}

export const GetCommunity: FC = () => {
  const { getId, onNavigate } = useRouter();
  const [category, setCategory] = useState("total")
  const { isLoading, isError, data, error } = useCommunity({ getId, category })
  const query = useGetCommunitesListQuery({})
  const [pageNum, setPageNum] = useState<number>(1)

  const onCategoryToggle = (eng:string) => () => {
    setCategory(eng)
  }

  const categoryList = [["전체", "total"], ["공지", "notification"], ["자유", "free"], ["후기", "review"]];

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
  query.isSuccess && console.log(query) // 인기게시물, 최근게시물, 배너

  // darkBlue2 // white
  return (
    <SC.FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
      <SC.FlexBox $gap={10}>
        {categoryList.map(([kor, eng]) => {
          const bColor = category === eng ? "darkBlue2": "white";
          return (<SC.CategoryBtn 
                      key={eng} 
                      onClick={onCategoryToggle(eng)} 
                      $bColor={bColor} 
                      children={<SC.CustomP $height="44px" $bColor={bColor} children={kor}/>} />)
        })}
      </SC.FlexBox>

      <SC.PostList $gap={10}>
        {isLoading
          ? (<div>로딩 중...</div>)
          : isError
            ? (<div>error... {JSON.stringify(error)}</div>)
            : (<>
              {data.content.map(({category, commentCount, createAt, isLike, content,likeCount, nickname, postId, thumbnail, title, view}:any) => (
                <SC.PostInnerItem key={postId} onClick={onNavigate({ url: `/community/review/${postId}` })}> {/* url */}
                  <SC.FigureObjectFitImg width={"100%"} height={"150px"} src={thumbnail} alt="mainLogo" />
                  <SC.PostInnerContext>
                    <SC.CategoryBtn $bColor="lightgray1" $types="PostTag"><SC.CustomP $height="34px" $bColor="lightgray1">{category}</SC.CustomP></SC.CategoryBtn>
                    <SC.FlexBox $fd="column" $gap={8} $ai="start" $jc="start">
                      <SC.PostingText $height="34px" ><p>{title}</p></SC.PostingText>
                      <SC.PostingText $height="24px" ><ShorteningP>{content}</ShorteningP></SC.PostingText>
                      <div>{nickname} 조회수 {view} {createAt}</div>
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5} style={{ width: "150px", height: "40px", position: "absolute", bottom: "10px", right: "15px" }}>
                      <LikeBox postId={postId} isLike={isLike} likeCount={likeCount}/>
                      <div>
                        <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={posting} alt="posting" />
                        <p>{commentCount}</p>
                      </div>
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
      {data && <PerDiv children={data.content[0].content}/>}
    </SC.FlexBox>
  )
}


const ShorteningP = styled.p`
  width: 100%;
  max-width: 400px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

/*

: 
"notification"
commentCount
: 
0
content
: 
"차량 신청과 이후에 진행할 차량랩핑에 필요한 가게정보나 후기들을 하나의 사이트에서 해결가능하도록 한다는 목표로 만들어진 사이트 입니다. \r\n많은 분들이 랩핑샵 후기, 자유게시판 글을 남겨 주실 수록 저희 커뮤니티에는 큰힘이 됩니다. \r\n앞으로 더 큰 만족을 드릴수 있는 Innomotors가 되겠습니다. 감사합니다."
createAt
: 
"2023-08-28T15:09:55.604443"
isLike
: 
false
likeCount
: 
3
nickname
: 
"back"
postId
: 
3
thumbnail
: 
"https://finalimgbucket.s3.amazonaws.com/bcf40407-5cd7-4c94-af75-269675447401"
title
: 
"Innomotors 공지"
url
: 
"/community/notification/3"
view
: 
0

*/

/*
import React, { useState } from "react";

type DebounceFn = (...args: any[]) => void;

function debounce(func: DebounceFn, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

const App: React.FC = () => {
  const [text, setText] = useState("");

  const logInput = debounce((input: string) => {
    console.log(input);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
    logInput(value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
};

export default App;
*/