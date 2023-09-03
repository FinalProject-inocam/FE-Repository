import React from "react";
import * as SC from "..";
import { Threejs } from "../../pages";
import * as Type from "../../types";

export const HomeSection2: React.FC<Partial<Type.UseHome>> = ({ sectionRef2, sectionRef3 }) => {
	return (
		<SC.SectionFlex ref={sectionRef2} $color='orange' $bColor='blackM'>
			<SC.SectionInner>
				<Threejs />
				<SC.CustomPSize $size={9.375} $mSize={10.416} $color='darkGray'>
					INNOCAM
				</SC.CustomPSize>
				<SC.SectionContent>
					<SC.CustomPSize $size={1.25} $mSize={1.388} $font='PretendardSB'>
						ANOTHER WORLD
					</SC.CustomPSize>
					<SC.CustomPSize $size={0.75} $mSize={0.833}>
						지금까지 없던 새로운 경험
					</SC.CustomPSize>
					<SC.SectionMoreBTN>MORE</SC.SectionMoreBTN>
				</SC.SectionContent>
				<button
					onClick={() => {
						if (sectionRef3 !== undefined && sectionRef3.current) {
							sectionRef3.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
					}}
					style={{
						position: "absolute",
						right: "0",
						height: "60px",
						width: "35px",
						borderRadius: "50px",
						border: "1px solid white",
						backgroundColor: "transparent",
						color: "white",
					}}>
					⬇︎
				</button>
			</SC.SectionInner>
			<SC.Triangle $bColor='darkBlue' />
		</SC.SectionFlex>
	);
};
