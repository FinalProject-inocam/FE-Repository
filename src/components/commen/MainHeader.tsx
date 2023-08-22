import React from "react";
import * as SC from "../css";
import * as CP from "../commen";
import { useMainHeader } from "../../hooks";

export const MainHeader: React.FC = () => {
  const {
    scrolly,
    onHanbagerToggle,
    onNaigateSidebarToggle,
    hanbagerToggle,
    setHanbagerToggle,
  } = useMainHeader();

  return (
    <>
      {/* 스플래시 스크린 */}
      <CP.Splash />
      {/* 헤더디자인 */}
      <SC.HeaderOutLine $scrolly={scrolly}>
        <SC.HeaderLayout $scrolly={scrolly}>
          <SC.HeaderLogo onClick={onNaigateSidebarToggle({ url: "/" })}>
            INNOCAM
          </SC.HeaderLogo>
          {/* DeskTop 네비바, 1024px 이상일 때 생성 */}
          <CP.DeskTopNavbar />
          {/* Mobile 사이드 바, 1024px 이하일 때 생성 */}
          <SC.HandagerBTN
            onClick={onHanbagerToggle}
            children={hanbagerToggle ? "x" : "▤"}
          />
          <CP.MoblieSiderbar
            state={hanbagerToggle}
            setState={setHanbagerToggle}
          />
        </SC.HeaderLayout>
      </SC.HeaderOutLine>
    </>
  );
};
