import { FC, useState, useContext } from "react";
import * as SC from "../css";
import { FigureObjectFitImg } from "../atom";
import { WrappingDetailContext } from "../../pages";

export const DetailReviewBanner: FC = () => {
	const [showMore, setShowMore] = useState<boolean>(false);
	const data = useContext(WrappingDetailContext);
	if (!data) return null;
	const { reviewImageSize } = data;

	const moreImagesCount = reviewImageSize - 4;

	return (
		<SC.ReviewBannerOutline>
			<SC.GridBox $gtc={"repeat(4, 1fr)"} $cgap={20} style={{ position: "relative", zIndex: "20" }}>
				{data.banner.map((_: string, idx: number) => (
					<SC.ReviewBannerLayout key={idx}>
						{idx <= 3 || showMore ? (
							<FigureObjectFitImg width={`100%`} height={`159px`} src={data.banner[idx]} alt='SomeImg' />
						) : null}

						{idx === 3 && moreImagesCount > 0 && !showMore && (
							<SC.ReviewBannerButton onClick={() => setShowMore(true)}>
								+{moreImagesCount}
							</SC.ReviewBannerButton>
						)}
					</SC.ReviewBannerLayout>
				))}
			</SC.GridBox>
		</SC.ReviewBannerOutline>
	);
};
