import { FC } from "react";
import * as SC from "../css";
import * as Hook from "../../hooks";

export const PageNation:FC<{pageNum:number}> = ({pageNum}) => {
  const {
    getId, onNavigate, // Router 관련
    data // 카테고리별, 비동기 통신
  } = Hook.useGetCommunity()

  return (
    <SC.FlexBox $gap={30} style={{ margin: "0 auto" }}>
        <SC.RankNum  $state={data && data.first} $bColor="lightgray3" onClick={onNavigate({ url: `/community/${getId && getId - 1}` })} children={<p children={`<`} />} />
        <SC.FlexBox $gap={10}>
          <SC.RankNum $state={ pageNum === 1 } $bColor="lightgray2" onClick={onNavigate({ url: `/community/${pageNum - 4}` })} children={<p children="..." />} />
          {data && pageNum + 4 >= data.totalPages
            ? Array
              .from({ length: data.totalPages - pageNum + 1 }, (_, idx) => idx)
              .map(list => <SC.RankNum
                key={list}
                $bColor={getId === pageNum + list ? `blue` : 'lightgray2'}
                onClick={onNavigate({ url: `/community/${pageNum + list}` })}
                children={<p children={`${pageNum + list}`} />} />)
            : Array
              .from({ length: 5 }, (_, idx) => idx)
              .map(list => <SC.RankNum
                key={list}
                $bColor={getId === pageNum + list ? `blue` : 'lightgray2'}
                onClick={onNavigate({ url: `/community/${pageNum + list}` })}
                children={<p children={list === 4 ? "..." : `${pageNum + list}`} />} />)}
        </SC.FlexBox>
        <SC.RankNum  $state={data && data.last} $bColor="lightgray3" onClick={onNavigate({ url: `/community/${getId && getId + 1}` })} children={<p children={`>`} />} />
      </SC.FlexBox>
  )
}