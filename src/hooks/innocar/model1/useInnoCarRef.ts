import { useEffect, useRef, useState, MouseEvent, Dispatch } from 'react';
import { useButtonThrottle } from '../../commen';
import { useInnoCarRefType } from '../../../types';

export const useInnoCarRef = ():useInnoCarRefType => {
  /* -- setSectionHeight ------------------------------------------------------- */
  const sectionRef1 = useRef<HTMLDivElement | null>(null);
  const sectionRef2 = useRef<HTMLDivElement | null>(null);
  const sectionRef3 = useRef<HTMLDivElement | null>(null);
  const sectionRef4 = useRef<HTMLDivElement | null>(null);
  const sectionRef5 = useRef<HTMLDivElement | null>(null);
  const sectionRef6 = useRef<HTMLDivElement | null>(null);
  const sectionRef7 = useRef<HTMLDivElement | null>(null);

  const sectionRefs = [
    { ref: sectionRef1, setHeight: 1 },
    { ref: sectionRef2, setHeight: 1 },
    { ref: sectionRef3, setHeight: 1 },
    { ref: sectionRef4, setHeight: 1 },
    { ref: sectionRef5, setHeight: 1 },
    { ref: sectionRef6, setHeight: 1 },
    { ref: sectionRef7, setHeight: 1 },
  ];

  useEffect(() => {
    /* -- setSectionHeight ------------------------------------------------------- */
    const setSectionHeight = () => {
      sectionRefs.forEach(
        (setHeight) =>
          setHeight.ref.current &&
          window.innerHeight > 650 &&
          (setHeight.ref.current.style.height = `${window.innerHeight * setHeight.setHeight}px`)
      );
    }
    setSectionHeight();
    window.addEventListener("resize", setSectionHeight)
    return () => {
      window.removeEventListener("resize", setSectionHeight)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [])

  /* -- innocarCharacterRef ------------------------------------------------------- */
  const innocarCharacterRef = useRef<HTMLDivElement | null>(null);
  const [carCharacter, setCarCharacter] = useState<boolean>(false)

  const onThrottle = useButtonThrottle(setCarCharacter, 1000)


  const onToggleCarCharacter = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onThrottle()
  }

  useEffect(() => {
    if (carCharacter && innocarCharacterRef.current) {
      innocarCharacterRef.current.style.display = "block"
      innocarCharacterRef.current.style.opacity = "1"
      setTimeout(() => {
        if (innocarCharacterRef.current) {
          innocarCharacterRef.current.style.top = "0"
          sectionRefs.forEach((setSection, idx) => {
            if (setSection.ref.current) {
              idx === 0
                ? setSection.ref.current.style.overflow = "auto"
                : setSection.ref.current.style.display = "none"
            }
          }
          )
        }

      }, 10)
    } else if (!carCharacter && innocarCharacterRef.current) {
      innocarCharacterRef.current.style.opacity = "0"
      innocarCharacterRef.current.style.top = "110vh"
      setTimeout(() => {
        if (innocarCharacterRef.current) {
          innocarCharacterRef.current.style.display = "none"
        }
      }, 200)
      sectionRefs.forEach(
        (setHeight, idx) => {
          if (setHeight.ref.current) {
            setHeight.ref.current.style.display = "flex"
            idx === 0 && (setHeight.ref.current.style.overflow = "hidden")
          }
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carCharacter])

  const onToggleTechnic = (setState: Dispatch<React.SetStateAction<boolean>>) => () => {
    setState((pre: boolean) => !pre)
  }
  /* -- SectionRef3:Scroll ------------------------------------------------------- */
  const sectionRef3InnerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef3FlexRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obsever = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef3.current) {
          if (sectionRef3InnerRef.current && sectionRef3FlexRef.current) {
            sectionRef3InnerRef.current.style.opacity = "0.4"
            sectionRef3FlexRef.current.style.display = "flex"
            setTimeout(() => {
              if (sectionRef3FlexRef.current) {
                sectionRef3FlexRef.current.style.top = "60%"
              }
            }, 300)
          }
        } else {
          if (sectionRef3InnerRef.current && sectionRef3FlexRef.current) {
            sectionRef3InnerRef.current.style.opacity = "0"
            // sectionRef3FlexRef.current.style.display = "none"
            setTimeout(() => {
              if (sectionRef3FlexRef.current) {
                sectionRef3FlexRef.current.style.top = "93%"
              }
            }, 10)

          }
        }
      },
      { threshold: 0.8 }
    )
    if (sectionRef3.current) {
      obsever.observe(sectionRef3.current)
    }

  }, [sectionRef3])

  const Sections3ScrollGridText = ["강력한 트윈 터보 6기통 수평 대향 엔진", "고정밀 이노(iNNo) 더블 클러치(PDK)", "향상된 드라이빈 다이내믹스 시스템"]

  return {
    Sections3ScrollGridText,
    sectionRef1,
    sectionRef2,
    sectionRef3,
    sectionRef4,
    sectionRef5,
    sectionRef6,
    sectionRef7,
    innocarCharacterRef,
    sectionRef3InnerRef,
    sectionRef3FlexRef,
    onToggleCarCharacter,
    onToggleTechnic
  }
}