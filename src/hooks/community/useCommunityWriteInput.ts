import { ChangeEvent, useEffect, useState } from "react"
import { setCommunityDate, useAppDispatch } from "../../redux"
import * as Hook from "../../types"

export const useCommunityWriteInput = (key: string, submited:boolean): Hook.useCommunityWrite => {
  const [value, setValue] = useState<string>("")
  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const dispatch = useAppDispatch()
  const onBlurValue = () => {
    dispatch(setCommunityDate({ [key]: value }))
  }

  useEffect(()=>{
    setValue("")
  },[submited])
  return { value, onChangeValue, onBlurValue }
}