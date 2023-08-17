import { useEffect, useRef } from "react"
import * as Type from "../../types"

export const useHome = (): Type.useHome => {
  /* "Home 내부 Section"에 대한 Ref */
  const sectionRef1 = useRef<HTMLDivElement | null>(null)
  const sectionRef2 = useRef<HTMLDivElement | null>(null)
  const sectionRef3 = useRef<HTMLDivElement | null>(null)
  const sectionRef4 = useRef<HTMLDivElement | null>(null)
  const sectionRef5 = useRef<HTMLDivElement | null>(null)

  /* sectionContent */
  const sectionContentRef = useRef<HTMLDivElement | null>(null) 

  useEffect(() => {
    /* 컴포넌트 마운트 시, Ref의 height에 대한 초기설정 및, window.addEventListener.resize에 대한 대응 */
    const setSectionHeight = () => {
      const sectionRefs = [{ref:sectionRef1,setHeight:1}, {ref:sectionRef2, setHeight:1}, {ref:sectionRef3,setHeight:1}, {ref:sectionRef4,setHeight:1}, {ref:sectionRef5,setHeight:1}]
      sectionRefs.forEach(setHeight => setHeight.ref.current && window.innerHeight > 650 && (setHeight.ref.current.style.height = `${window.innerHeight * setHeight.setHeight}px`))
    }
    setTimeout(()=> {
      sectionContentRef.current && (sectionContentRef.current.style.transform = "translateY(0)");
    }, 1100)

    /* setSectionHeight 호출의 3가지 시점, 초기, resize 변경시, 변경에 대한 기존의 함수 초기화  */
    setSectionHeight()
    window.addEventListener("resize", setSectionHeight)

    return () => { 
      window.removeEventListener("resize", setSectionHeight) 
    }
  }, []);

  return { sectionRef1, sectionRef2, sectionRef3, sectionRef4, sectionRef5, sectionContentRef }
}