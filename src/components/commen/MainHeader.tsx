import React from 'react'
import * as SC from '../css'
import { useMainHeader } from '../../hooks'

export const MainHeader: React.FC = () => {
  const scrolly = useMainHeader()

  return (
    <SC.HeaderOutLine $scrolly={scrolly}>
      <SC.HeaderLayout $scrolly={scrolly}>
        <div>INNOCAM</div>
      </SC.HeaderLayout>
    </SC.HeaderOutLine>
  )
}