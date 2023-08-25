import { FC, useContext } from "react";
import * as SC from "../css";
import * as AS from "../../assets";
import * as Hook from "../../hooks";

export const DetailScore: FC = () => {
	const data = useContext(Hook.WrappingDetailContext);
	if (!data) return null;
	const { reviews, avgStar } = data;

	return (
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
	);
};
