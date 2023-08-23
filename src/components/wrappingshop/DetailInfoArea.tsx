import { FC, useContext } from "react";
import * as SC from "../css";
import * as AS from "../../assets";
import { FigureObjectFitImg } from "../atom";
import { WrappingDetailContext } from "../../pages";

export const DetailInfoArea: FC = () => {
	const data = useContext(WrappingDetailContext);
	if (data === null) return null;
	const { shopName, address, banner, reviews, avgStar } = data;

	return (
		<SC.FlexBox $fd='column' $gap={5} style={{ position: "relative" }}>
			{/* DetailInfo */}
			<SC.DetailInfoLayout>
				<FigureObjectFitImg width={`467px`} height={`300px`} src={banner[0]} alt='SomeImg' />
				<SC.DetailInfoInner $fd='column' $ai='flex-start' $gap={10}>
					<SC.CustomH1 children={shopName} />
					<SC.CustomH2 children={address} />
				</SC.DetailInfoInner>
			</SC.DetailInfoLayout>

			{/* DetailScore */}
			<SC.DetailInfoInner $fd='column' $ai='flex-start' $gap={20}>
				<SC.FlexBox $gap={10}>
					<SC.CustomH1 children='리뷰' />
					{!!reviews.length && <SC.CustomH1 $color='blue' children={reviews.length} />}
				</SC.FlexBox>
				<SC.GridBox>
					<SC.DetailScoreDiv $bgColor='gray' $bColor='gray' $gap={8}>
						<SC.CustomH3 $size={40} children={avgStar.toFixed(1)} />
						<SC.CustomH3 $size={20} children='/5.0' />
					</SC.DetailScoreDiv>
					<SC.DetailScoreDiv $bColor='gray'>
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
