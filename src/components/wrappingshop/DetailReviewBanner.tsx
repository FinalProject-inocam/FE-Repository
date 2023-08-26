import { FC, useContext, useState, useEffect } from "react";
import * as SC from "../css";
import * as Hook from "../../hooks";
import { FigureObjectFitImg } from "../atom";

export const DetailReviewBanner: FC = () => {
	const data = useContext(Hook.WrappingDetailContext);
	const [bannerNum, setBannerNum] = useState<number>(0);

	useEffect(() => {
		const onBannerNum = () => {
			window.innerWidth >= 1440
				? setBannerNum(4)
				: window.innerWidth >= 1200
				? setBannerNum(3)
				: window.innerWidth >= 1024
				? setBannerNum(2)
				: setBannerNum(1);
		};
		onBannerNum();
		window.addEventListener("resize", onBannerNum);
		return () => {
			window.removeEventListener("resize", onBannerNum);
		};
	}, []);

	if (!data) return null;
	const { reviewImageSize: imgCount, banner } = data;
	const bannerEdit = banner.slice(0, bannerNum);

	return (
		<SC.ReviewBannerGridBox $cgap={20}>
			{bannerEdit.map((img: string, idx: number) =>
				idx < bannerNum - 1 ? (
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
							children={`+${imgCount - bannerNum}`}
						/>
					</FigureObjectFitImg>
				)
			)}
		</SC.ReviewBannerGridBox>
	);
};
