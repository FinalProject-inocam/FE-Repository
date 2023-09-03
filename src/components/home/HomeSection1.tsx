import React from "react";
import * as SC from "..";
import { useHome } from "../../hooks";
import * as Type from "../../types";

export const HomeSection1: React.FC<Partial<Type.UseHome>> = ({ sectionRef1, sectionRef2 }) => {
	const { sectionContentRef, videoUrl } = useHome();
	return (
		<SC.SectionFlex ref={sectionRef1} $color='red' $position='relative'>
			<SC.SectionContent ref={sectionContentRef}>
				<SC.CustomPSize $size={4.375} $mSize={5.46} $font='PretendardSB'>
					ANOTHER WORLD
				</SC.CustomPSize>
				<SC.CustomPSize $size={2.5} $mSize={3.125}>
					지금까지 없던 새로운 경험
				</SC.CustomPSize>
				<SC.SectionMoreBTN
					onClick={() => {
						if (sectionRef2 !== undefined && sectionRef2.current) {
							sectionRef2.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
					}}>
					MORE
				</SC.SectionMoreBTN>
			</SC.SectionContent>
			<SC.FlexBox as='figure' style={{ width: "100%" }}>
				<SC.SectionOneVideo src={videoUrl} muted loop autoPlay playsInline />
			</SC.FlexBox>
		</SC.SectionFlex>
	);
};
