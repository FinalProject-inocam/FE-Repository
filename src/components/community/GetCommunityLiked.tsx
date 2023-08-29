import { FC } from "react"
import * as RTK from "../../redux";
import * as Hook from "../../hooks";
import * as ASS from "../../assets";
import * as SC from "../../components";

export const GetCommunityLiked: FC<any> = ({ postId, isLike, likeCount }) => {
  const [onPatchLiked] = RTK.usePatchCommunityLikedMutation()
  const onDebounce = Hook.useDebounce()

  return (
    <SC.FlexBox $gap={5} onClick={onDebounce(onPatchLiked, postId)}>
      <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={isLike ? ASS.heart : ASS.heartg} alt="heart" />
      <p>{likeCount}</p>
    </SC.FlexBox>)
}