import React from "react";
import * as SC from "../../components";
import * as Type from "../../types";

export const HomeSection3: React.FC<Partial<Type.useHome>> = ({ sectionRef3 }) => {
	return (
		<SC.SectionFlex ref={sectionRef3} $color='green' $bColor='darkBlue' $position='relative'>
			<SC.Triangle $bColor='blackM' />
		</SC.SectionFlex>
	);
};
