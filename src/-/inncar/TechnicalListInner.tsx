import { FC } from "react";
import * as SC from "../css";
import * as Hook from "../../hooks";
import * as Type from "../../types";



export const TechnicalListInner:FC<Type.TechnicalListInnerProps> = ({title, technicalInfoCategory, onToggle, infoBoolean, setInfoBoolean}) => {
  /* useModelOne에서 호출한 technicalInfo 가운데, 찾고자 하는 해당 technicalInfoCategory 만을 찾아서 반환 */
  const { technicalInfo } = Hook.useModelOne();
  return (
    <SC.FlexBox $fd='column' style={{ borderBottom: "1px solid lightgray" }}>
      <SC.FlexBox $jc='space-between' style={{ width: "100%", height: "60px" }} onClick={onToggle(setInfoBoolean)}>
        <SC.CustomH1 children={title} />
        <div >토글버튼</div>
      </SC.FlexBox>
      {infoBoolean && technicalInfo[technicalInfoCategory].map((list:string[]) => (
        <SC.GridBox key={list[0]} $gtc='200px 1fr' style={{ width: "100%", borderBottom: "1px solid lightgray", minHeight: "3rem" }}>
          <SC.FlexBox $jc='flex-start' children={<SC.CustomH2 children={list[0]} />} />
          <SC.CustomH3 style={{ lineHeight: "50px" }} children={list[1]} />
        </SC.GridBox>
      ))}
    </SC.FlexBox>
  )
}
