import { useModelOne } from "../../hooks"
import { innoCarImgText } from "../../types"
import { FigureImg } from "../atom"
import { CustomH1, CustomH2, InnoCarImgFlex, InnoCarImgInnerText } from "../css"

export const TechnicalListInnerImg = () => {
  const { innoCarImgText } = useModelOne()
  return (
    <div style={{ width: "100%", position: "sticky", top:"0"}}>
    <InnoCarImgFlex $ai='flex-start'>
      <FigureImg width='50%' height='fin-content' types="innocar" src={require('../../assets/porshce/m1Character.png')} alt='m1Character' />
      {innoCarImgText.map(({title, content, top, left, right, mTop, mRight, types, tAlign}:innoCarImgText, idx:number) => (
        <InnoCarImgInnerText 
          key={title+idx}
          $top={top} $left={left} $right={right} 
          $Mtop={mTop} $Mright={mRight} 
          $types={types} $tAlign={tAlign}
          children={(<>
            <CustomH2 children={title} />
            <CustomH1 children={content} />
          </>)} />
      ))}
    </InnoCarImgFlex>
  </div>
  )
}