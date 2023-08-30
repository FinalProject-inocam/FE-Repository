import { FormEvent, MouseEvent, useEffect, useState } from "react"
import { useRouter } from "../useRouter"
import * as RTK from "../../redux"

export const useCommunityWrite = () => {
  const { onNavigate } = useRouter()
  const [submited, setSubmited] = useState<boolean>(false)
  const [imgs, setImgs] = useState<any>([])
  const [postTagToggle, setPostTagToggle] = useState<boolean>(false)
  const [postTag, setPostTag] = useState<string>("후기")
  const dispatch = RTK.useAppDispatch()

  const onPostTagToggle = () => {
    setPostTagToggle(pre => !pre)
  }

  const onSetPostTag = (e: MouseEvent<HTMLElement>) => {
    const { dataset: { value } } = e.target as HTMLElement
    value && setPostTag(value)
    dispatch(RTK.setCommunityDate({ category: value }))
    setPostTagToggle(pre => !pre)
  }

  const getCommunityData = RTK.useAppSelector(RTK.selectCommunityForm)
  const [onPostCommunity] = RTK.usePostCommunityMutation()
  const onSubmitReview = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("data", new Blob([JSON.stringify(getCommunityData)], { type: "application/json" }));
    if (imgs) {
      for (let i = 0; i < imgs.length; i++) {
        imgs && formData.append("images", imgs[i]);
      }
    }
    onPostCommunity(formData)
    setSubmited(pre => !pre)
    setImgs([])
    setPostTag("후기")
  }

  useEffect(() => {
    window.scrollTo(0, 500)
    dispatch(RTK.setCommunityDate({ category: "후기" }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {onNavigate, onSubmitReview, onPostTagToggle, postTag, postTagToggle, onSetPostTag, imgs, setImgs, submited}
}