import { useEffect, useRef } from "react"

export const useLayoutRef = () => {
  const LayoutRef = useRef<HTMLDivElement |  null>(null)

	useEffect(()=> {
		LayoutRef.current && (LayoutRef.current.style.height = `${window.innerHeight}px`)
	}, [LayoutRef])

  return LayoutRef
}