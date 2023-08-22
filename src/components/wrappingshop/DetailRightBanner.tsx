import React, { useState } from "react";
import * as SC from "../../components/css";
import * as Type from "../../types";
import { FigureObjectFitImg } from "../atom";

export const DetailRightBanner: React.FC<Type.WrappingDetailProps> = ({ data }) => {
	const [showMore, setShowMore] = useState(false);

	const moreImagesCount = data.reviewImageSize - 4;

	return (
		<SC.RightBanner $gtc={"repeat(4, 1fr)"}>
			{data.banner.map((_: string, idx: number) => (
				<SC.DetailRightBannerInner key={idx}>
					{idx <= 3 || showMore ? (
						<FigureObjectFitImg
							width={`100%`}
							height={`159px`}
							src={data.banner[idx]}
							borderR={"10px"}
							alt='SomeImg'
						/>
					) : null}

					{idx === 3 && moreImagesCount > 0 && !showMore && (
						<SC.MoreButton onClick={() => setShowMore(true)}>+{moreImagesCount}</SC.MoreButton>
					)}
				</SC.DetailRightBannerInner>
			))}
		</SC.RightBanner>
	);
};
