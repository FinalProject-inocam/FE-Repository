import React from "react";
import { useHome } from "../../hooks";
import * as CP from "../../components";

export const Home: React.FC = () => {
	const { sectionRef1, sectionRef2, sectionRef3, sectionRef4, sectionRef5 } = useHome();

	return (
		<>
			<CP.HomeSection1 sectionRef1={sectionRef1} sectionRef2={sectionRef2} />
			<CP.HomeSection2 sectionRef2={sectionRef2} sectionRef3={sectionRef3} />
			<CP.HomeSection3 sectionRef3={sectionRef3} />
			<CP.HomeSection4 sectionRef4={sectionRef4} />
			<CP.HomeSection5 sectionRef5={sectionRef5} />
		</>
	);
};
