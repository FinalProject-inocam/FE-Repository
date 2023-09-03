import React from "react";
import * as Type from "../../types";
import * as SC from "..";

export const HomeSection4: React.FC<Partial<Type.UseHome>> = ({ sectionRef4 }) => {
	return (
		<SC.SectionFlex ref={sectionRef4} $color='yellow' $bColor='blackM'>
			<SC.SectionInner>
				<SC.GridBox $gap={20} style={{ width: "100%", height: "100%" }}>
					<SC.FlexBox $fd='column' $ai='start' $gap={22}>
						<SC.CustomPSize $size={3.125}>이노캠모터스는</SC.CustomPSize>
						<SC.CustomPSize $size={3.125}>랩핑 & 출고 후기를</SC.CustomPSize>
						<SC.CustomPSize $size={3.125}>공유하고 알려드려요</SC.CustomPSize>
					</SC.FlexBox>
					<SC.FlexBox $gap={20} $ai='start' style={{ height: "551px", margin: "auto 0" }}>
						<SC.SectionFourCard $height='401px' $borderR='0 0 0 50px'>
							<SC.SectionFourCardImg $height='200px' />
							<SC.SectionFourCardInner>아</SC.SectionFourCardInner>
						</SC.SectionFourCard>
						<SC.SectionFourCard $height='100%' $borderR='0 50px 0 0'>
							<SC.SectionFourCardImg $height='350px' />
							<SC.SectionFourCardInner>아</SC.SectionFourCardInner>
						</SC.SectionFourCard>
					</SC.FlexBox>
				</SC.GridBox>
			</SC.SectionInner>
		</SC.SectionFlex>
	);
};
