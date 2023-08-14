import { useEffect, useState } from "react"
import * as Type from '../../types';

export const useMainHeader = ():any => {

  const [scrolly, setScrolly] = useState<Type.UseHeadScroll>({
    scrolly:0,
    innerHeight:window.innerHeight,
    preScrolly:false,
    isTop:false
  })

  setTimeout(()=>{
    setScrolly({...scrolly, scrolly:window.scrollY, preScrolly:false, isTop:true})
  }, 3000)

  useEffect(()=> {
    const onSetScrollY = () => {
      window.scrollY === 0 
      ?setScrolly({...scrolly, scrolly:window.scrollY, preScrolly:false, isTop:true})
      :setScrolly({...scrolly, scrolly:window.scrollY, preScrolly:scrolly.scrolly > window.scrollY, isTop:false})
    }

    window.addEventListener("scroll", () => {
      onSetScrollY()
    })
    window.removeEventListener("scroll", () => {
      onSetScrollY()
  })
  }, [scrolly])
  return scrolly
}

