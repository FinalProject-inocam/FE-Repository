import { FC } from "react"
import { CommuityTextaAreaCount, CommunityTextArea, PositionRelavite } from "../.."
import { useCommunityWriteInput } from "../../../hooks"

export const CommunityFormTextArea: FC<{submited:boolean}> = ({submited}) => {
  const { value: comment, onChangeValue, onBlurValue } = useCommunityWriteInput("content", submited)

  return (
    <PositionRelavite style={{ width: "100%" }}>
      <CommunityTextArea
        value={comment}
        onChange={onChangeValue}
        onBlur={onBlurValue}
        maxLength={1000}
        placeholder='내용을 입력해주세요' />
      <CommuityTextaAreaCount $size={comment.length} children={`${comment.length}/1000`} />
    </PositionRelavite>
  )
}
