import React from "react";
import * as SC from "../css";
import * as CP from ".";
import { useMainHeader } from "../../hooks";
import { FigureObjectFitImg } from "../atom";
import { innoLogoHeader, innoLogoHeaderB } from "../../assets/logo";

export const MainHeader: React.FC = () => {
	const { scrolly, pathname, onHanbagerToggle, onNaigateSidebarToggle, hanbagerToggle, setHanbagerToggle } =
		useMainHeader();
	const pathState = pathname === "/";

	return (
		<>
			{/* 스플래시 스크린 */}
			<CP.Splash />
			{/* 헤더디자인 */}
			<SC.HeaderOutLine $scrolly={scrolly} $state={pathState}>
				<SC.HeaderLayout $scrolly={scrolly} $state={pathState}>
					<SC.HeaderLogo onClick={onNaigateSidebarToggle({ url: "/" })}>
						<FigureObjectFitImg
							width={"179px"}
							height={"50px"}
							src={scrolly.scrolly <= scrolly.innerHeight || !pathState ? innoLogoHeader : innoLogoHeaderB}
							alt='mainLogo'
						/>
					</SC.HeaderLogo>
					{/* DeskTop 네비바, 1024px 이상일 때 생성 */}
					<CP.DeskTopNavbar />
					{/* Mobile 사이드 바, 1024px 이하일 때 생성 */}
					<SC.HandagerBTN onClick={onHanbagerToggle} children={hanbagerToggle ? "x" : "▤"} />
					<CP.MoblieSiderbar state={hanbagerToggle} setState={setHanbagerToggle} />
				</SC.HeaderLayout>
			</SC.HeaderOutLine>
		</>
	);
};
