import { FC, useContext } from "react";
import * as SC from "../css";
import * as AS from "../../assets";
import { FigureObjectFitImg } from "../atom";
import * as Hook from "../../hooks";

export const DetailInfoArea: FC = () => {
	const data = useContext(Hook.WrappingDetailContext);
	if (!data) return null;
	const { shopName, address, banner, avgStar, reviewCount } = data;

	return (
		<SC.FlexBox $fd='column' $gap={5} $jc={"flex-start"} style={{ position: "relative" }}>
			{/* DetailInfo */}
			<SC.DetailInfoLayout>
				<FigureObjectFitImg width={`100%`} height={`300px`} src={banner[0]} alt='SomeImg' />
				<SC.DetailInfoInner $fd='column' $ai='flex-start' $gap={10}>
					<SC.CustomH1 children={shopName} />
					<SC.CustomH2 children={address} />
				</SC.DetailInfoInner>
			</SC.DetailInfoLayout>

			{/* DetailScore */}
			<SC.DetailInfoInner $fd='column' $ai='flex-start' $gap={20}>
				<SC.FlexBox $gap={10}>
					<SC.CustomH1 children='리뷰' />
					{!!reviewCount && <SC.CustomH1 $color='blue' children={reviewCount} />}
				</SC.FlexBox>
				<SC.GridBox style={{ border: "1px solid #c7c7cb" }}>
					<SC.DetailScoreDiv $bgColor='gray' $bColor='gray' $gap={8}>
						<SC.CustomH3 $size={2.5} children={avgStar.toFixed(1)} />
						<SC.CustomH3 $size={1.25} children='/5.0' />
					</SC.DetailScoreDiv>
					<SC.DetailScoreDiv $bColor='none' $height='70px'>
						{Array.from({ length: 5 }).map((_, index) => (
							<img
								key={index}
								style={{ width: "25px", height: "25px" }}
								src={index < avgStar ? AS.ReviewStarFull : AS.ReviewStarEmpty}
								alt={`별-${index}`}
							/>
						))}
					</SC.DetailScoreDiv>
				</SC.GridBox>
			</SC.DetailInfoInner>
		</SC.FlexBox>
	);
};
