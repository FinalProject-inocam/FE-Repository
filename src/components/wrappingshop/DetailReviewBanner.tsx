import { FC, useContext } from "react"; // useState
import * as SC from "../css";
import * as Hook from "../../hooks";
import { FigureObjectFitImg } from "../atom";

export const DetailReviewBanner: FC = () => {
	const data = useContext(Hook.WrappingDetailContext);
	if (!data) return null;
	const { reviewImageSize: imgCount, banner } = data;
	const bannerEdit = banner.slice(0, 4);

	return (
		<SC.ReviewBannerGridBox $gtc={"repeat(4, 1fr)"} $cgap={20}>
			{bannerEdit.map((img: string, idx: number) =>
				idx < 3 ? (
					<FigureObjectFitImg
						key={img}
						src={img}
						width='100%'
						types='reviewBanner'
						alt={`Review Banner img ${idx + 1}`}
					/>
				) : (
					<FigureObjectFitImg
						key={img}
						src={img}
						width='100%'
						types='reviewBanner'
						alt={`Review Banner img ${idx + 1}`}>
						<SC.ReviewBannerMoreBtn
							onClick={() => console.log("모든이미지 보여주기 준비..")}
							children={`+${imgCount - 4}`}
						/>
					</FigureObjectFitImg>
				)
			)}
		</SC.ReviewBannerGridBox>
	);
};
