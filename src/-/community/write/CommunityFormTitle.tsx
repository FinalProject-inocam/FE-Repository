import { FC } from "react"
import { PostWriteTag } from "../.."
import { useCommunityWriteInput } from "../../../hooks"

export const CommunityFormTitle: FC<{submited:boolean}> = ({submited}) => {
  const { value: title, onChangeValue, onBlurValue } = useCommunityWriteInput("title", submited)

  return <PostWriteTag
    as="input"
    type='text'
    value={title}
    onChange={onChangeValue}
    onBlur={onBlurValue}
    maxLength={40}
    placeholder='제목을 입력해주세요.'
    style={{ display: "block", width: "100%" }} />
}