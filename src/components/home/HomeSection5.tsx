import React from "react";
import * as SC from "../../components";
import * as Type from "../../types";

export const HomeSection5: React.FC<Partial<Type.UseHome>> = ({ sectionRef5 }) => {
	return (
		<SC.SectionFlex ref={sectionRef5} $color='coral' $bColor='purple'>
			<SC.SectionInner>
				<SC.GridBox $gap={20}>
					<SC.FigureImg width='100%' src={require("../../assets/1920pxtest.jpg")} alt='메인화면 이미지' />
					<SC.FlexBox $fd='column' $ai='start' style={{ paddingLeft: "102px" }} $gap={22}>
						<SC.CustomPSize $size={3.125}>이노캠모터스는</SC.CustomPSize>
						<SC.CustomPSize $size={3.125}>랩핑 & 출고 후기를</SC.CustomPSize>
						<SC.CustomPSize $size={3.125}>공유하고 알려드려요</SC.CustomPSize>
						<SC.SectionMoreBTN>SHOP</SC.SectionMoreBTN>
					</SC.FlexBox>
				</SC.GridBox>
			</SC.SectionInner>
		</SC.SectionFlex>
	);
};
