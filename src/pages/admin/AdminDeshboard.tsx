import React from "react";
import * as SC from "../../components";
import {
	Chart as ChartJS,
	BarElement,
	LineElement,
	LinearScale,
	CategoryScale,
	RadialLinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import * as ASS from "../../assets";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAdminDeshboard } from "../../hooks/admin";
import { DeshboardUser } from "../../components/admin/DeshboardUser";
import { styled } from "styled-components";
dayjs.locale("ko");
ChartJS.register(
	ArcElement,
	Tooltip,
	BarElement,
	LineElement,
	LinearScale,
	CategoryScale,
	RadialLinearScale,
	Legend
);

export const AdminDeshboard: React.FC = () => {
	const {
		getType,
		dataTypeSelect,
		showPeriod,
		afterPeriodState,
		onAfterPeriod,
		onPeriodSelect,
		onBeforePeriod,
		onChangeDataTypeSelect,

		// RTKQ
		userLoading,
		userIsError,
		purchaseLoading,
		purchaseIsError,
		purchaseData,

		// Chart
		onReduce,
		dataRatioOpts,
		barChartOpts,
		purchaseRatio,
		purchaseLineData,
		purchaseReduce,
		approveReduce,
		cancelReduce,
		purchaseGenderDonutData,
		purchaseAgeDonutData
	} = useAdminDeshboard();

	console.log("purchaseData.age", purchaseData)

	return (
		<SC.DeshboardGrid $gtc='1fr 380px' $gtr={`${window.innerHeight}px`} style={{ width: "100%" }}>
			<SC.ChartLayout $bColor='lightgray1' $padding='40px'>
				<SC.FlexBox $jc='space-between'>
					<SC.CustomH1 $size={1.5} $color='darkBlue3' children='출고관리' />
					<SC.FlexBox $gap={10}>
						<SC.DataTypeSelect $jc='space-around' onClick={onChangeDataTypeSelect}>
							<div>{getType[0]}</div>
							<SC.FigureObjectFitImg
								width='14px'
								height='7px'
								src={ASS.underArrow}
								alt='underArrow'></SC.FigureObjectFitImg>
							{dataTypeSelect && (
								<SC.DataTypeOptions>
									{[
										["주간", "week"],
										["월간", "month"],
										["연간", "year"],
									].map((list) => (
										<div onClick={onPeriodSelect} data-value={list.join(".")} key={list[1]}>
											{list[0]}
										</div>
									))}
								</SC.DataTypeOptions>
							)}
						</SC.DataTypeSelect>
						<SC.DateShowPeriod $jc='space-between'>
							{/* 날짜 이동 버튼  */}
							<SC.FigureObjectFitImg
								types='cursor'
								onClick={onBeforePeriod}
								width='16px'
								height='16px'
								src={ASS.leftArrowB}
								alt='leftArrow'
							/>
							<div>{showPeriod}</div>
							<SC.FigureObjectFitImg
								types={afterPeriodState ? "cursor" : "none"}
								onClick={onAfterPeriod}
								width='16px'
								height='16px'
								src={afterPeriodState ? ASS.rigthArrowB : ASS.rigthArrowG}
								alt='rigthArrow'
							/>
						</SC.DateShowPeriod>
						<SC.FigureObjectFitImg width='40px' height='40px' src={ASS.calendar} alt='calendar' />
					</SC.FlexBox>
				</SC.FlexBox>
				{/* PurchaseChartLayout // body */}
				<SC.GridBox
					$gtc='1fr'
					$gtr='180px repeat(2, 1fr)'
					$rgap={20}
					$jc='flex-start'
					style={{ height: "calc(100% - 40px)", marginTop: "10px" }}>
					<SC.GridBox $gap={10}>
						<SC.ChartInner $fd='column' $ai='flex-start' $gap={10} $types='left'>
							<SC.CustomH1 $size={1.125} children='주간요약' />
							<SC.GridBox $gtc='repeat(3, 1fr)' style={{ height: "100%" }} $gap={4}>
								{userLoading ? (
									<div>로딩 중... </div>
								) : userIsError ? (
									<div>서버 꺼짐...</div>
								) : (
									<>
										<SC.FlexBox
											$gap={3}
											$fd='column'
											$ai='flex-start'
											style={{
												padding: "0 25px",
												border: "1px solid #DEDEE0",
												borderRadius: "10px",
											}}>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children='출고현황' />
											<SC.CustomH3
												$size={1.5}
												children={
													<>
														13
														<span children='건' />
													</>
												}
											/>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children={`전주, 7명`} />
										</SC.FlexBox>
										<SC.FlexBox
											$gap={3}
											$fd='column'
											$ai='flex-start'
											style={{
												padding: "0 25px",
												border: "1px solid #DEDEE0",
												borderRadius: "10px",
											}}>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children='출고승인' />
											<SC.CustomH3
												$size={1.5}
												children={
													<>
														5<span children='건' />
													</>
												}
											/>
											<SC.CustomH3
												$size={0.75}
												style={{ visibility: "visible", height: "15px" }}
											/>
										</SC.FlexBox>
										<SC.FlexBox
											$gap={3}
											$fd='column'
											$ai='flex-start'
											style={{
												padding: "0 25px",
												border: "1px solid #DEDEE0",
												borderRadius: "10px",
											}}>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children='츨고취소' />
											<SC.CustomH3
												$size={1.5}
												children={
													<>
														5<span children='건' />
													</>
												}
											/>
											<SC.CustomH3
												$size={0.75}
												style={{ visibility: "visible", height: "15px" }}
											/>
										</SC.FlexBox>
									</>
								)}
							</SC.GridBox>
						</SC.ChartInner>
						<SC.ChartInner $fd='column' $ai='flex-start' $gap={10} $types='left'>
							<SC.CustomH1 $size={1.125} children='금일 출고 현황' />
							<SC.GridBox $gtc='repeat(3, 1fr)' style={{ height: "100%" }} $gap={4}>
								{userLoading ? (
									<div>로딩 중... </div>
								) : userIsError ? (
									<div>서버 꺼짐...</div>
								) : (
									<>
										<SC.FlexBox
											$gap={3}
											$fd='column'
											$ai='flex-start'
											style={{
												padding: "0 25px",
												border: "1px solid #DEDEE0",
												borderRadius: "10px",
											}}>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children='출고현황' />
											<SC.CustomH3
												$size={1.5}
												children={
													<>
														13
														<span children='건' />
													</>
												}
											/>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children={`전주, 7명`} />
										</SC.FlexBox>
										<SC.FlexBox
											$gap={3}
											$fd='column'
											$ai='flex-start'
											style={{
												padding: "0 25px",
												border: "1px solid #DEDEE0",
												borderRadius: "10px",
											}}>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children='출고승인' />
											<SC.CustomH3
												$size={1.5}
												children={
													<>
														5<span children='건' />
													</>
												}
											/>
											<SC.CustomH3
												$size={0.75}
												style={{ visibility: "visible", height: "15px" }}
											/>
										</SC.FlexBox>
										<SC.FlexBox
											$gap={3}
											$fd='column'
											$ai='flex-start'
											style={{
												padding: "0 25px",
												border: "1px solid #DEDEE0",
												borderRadius: "10px",
											}}>
											<SC.CustomH3 $size={0.75} $color='textColorSub' children='츨고취소' />
											<SC.CustomH3
												$size={1.5}
												children={
													<>
														5<span children='건' />
													</>
												}
											/>
											<SC.CustomH3
												$size={0.75}
												style={{ visibility: "visible", height: "15px" }}
											/>
										</SC.FlexBox>
									</>
								)}
							</SC.GridBox>
						</SC.ChartInner>
					</SC.GridBox>
					<SC.ChartInner $types='left'>

						<SC.GridBox $gtc='300px 1fr' style={{ width: "100%", height: "100%" }} $cgap={10}>

							{/* Deshboard-Purchase-Section 02-01 전체출고현황 그래프 */}
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $ai='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} children='전체 출고현황 그래프' />
								<SC.GridBox $cgap={5} style={{ height: "100%", width: "100%" }}>
									<SC.FlexBox style={{ width: "100%", height: "100%" }}>
										<CustomDoughnut options={dataRatioOpts} data={purchaseRatio} />
									</SC.FlexBox>
									<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
										{userLoading ? (
											<div>로딩 중... </div>
										) : userIsError ? (
											<div>서버... 꺼짐...</div>
										) : [
											["신청", "blue", `${purchaseReduce}건`],
											["확정", "chartGreen", `${approveReduce}건`, `${((approveReduce / purchaseReduce) * 100).toFixed(1)}%`],
											["취소", "red3", `${approveReduce}건`, `${((cancelReduce / purchaseReduce) * 100).toFixed(1)}%`]
										].map((legend: any) => (
											<SC.FlexBox key={legend[0]} $gap={5}>
												<SC.RatioBox $size={14} $bColor={legend[1]} />
												<SC.CustomH3 $size={0.875} $color={legend[1]} children={legend[0]} />
												{purchaseReduce && <SC.CustomH3 $size={0.875} children={legend[2]} />}
												{purchaseReduce && legend[3] && <SC.CustomH3 $size={0.875} children={legend[3]}
												/>}
											</SC.FlexBox>
										))
										}
									</SC.FlexBox>
								</SC.GridBox>
							</SC.PurchaseSecondRowInner>

							{/* Deshboard-Purchase-Section 02-02 주간출고현황 그래프 */}
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} style={{ width: "100%" }} children={`${getType[0]} 출고현황 그래프`} />
								<SC.PositionRelavite $gap={10} style={{ width: "100%", height: "100%" }}>
									{/* 주간출고현황 레전드 부분 */}
									<SC.FlexBox $gap={10} style={{ position: "absolute", top: "-14px", right: "0" }}>
										{[["신청", "blue"], ["확정", "chartGreen"], ["취소", "red3"]].map((legend: any) => (
											<SC.FlexBox key={legend[0]} $gap={5}>
												<SC.RatioBox $size={14} $bColor={legend[1]} />
												<SC.CustomH3 $size={0.875} $color={legend[1]} children={legend[0]} />
											</SC.FlexBox>
										))}
									</SC.FlexBox>

									{/* 주간출고현황 그래프 부분 */}
									<SC.FlexBox style={{ width: "100%", height: "100%" }}>
										<SC.CustomBar options={barChartOpts} data={purchaseLineData} />
									</SC.FlexBox>
								</SC.PositionRelavite>
							</SC.PurchaseSecondRowInner>
						</SC.GridBox>
					</SC.ChartInner>


					<SC.ChartInner $types='left'>
						<SC.GridBox $gtc='300px 1fr' style={{ width: "100%", height: "100%" }} $cgap={10}>
							{/* Deshboard-Purchase-Section 03-01 신청 성별 그래프 */}
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $ai='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} children='신청 성별 그래프' />
								<SC.GridBox $cgap={5} style={{ height: "100%", width: "100%" }}>
									<SC.FlexBox style={{ width: "100%", height: "100%" }}>
										<CustomDoughnut options={dataRatioOpts} data={purchaseGenderDonutData} />
									</SC.FlexBox>
									<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
										{purchaseLoading ? (
											<div>로딩 중... </div>
										) : purchaseIsError ? (
											<div>서버... 꺼짐...</div>
										) : [
											["남성", "blue", `${purchaseData.gender.values[0]}명`, `${purchaseData.gender.ratios[0]}%`],
											["여성", "red3", `${purchaseData.gender.values[1]}명`, `${purchaseData.gender.ratios[1]}%`],
											["미상", "textColorSub", `${purchaseData.gender.values[2]}명`, `${purchaseData.gender.ratios[2]}%`],
										].map((legend: any) => (
											<SC.FlexBox key={legend[0]} $gap={5}>
												<SC.RatioBox $size={14} $bColor={legend[1]} />
												<SC.CustomH3 $size={0.875} $color={legend[1]} children={legend[0]} />
												{purchaseReduce && <SC.CustomH3 $size={0.875} children={legend[2]} />}
												{purchaseReduce && legend[3] && <SC.CustomH3 $size={0.875} children={legend[3]}
												/>}
											</SC.FlexBox>
										))
										}
									</SC.FlexBox>
								</SC.GridBox>

							</SC.PurchaseSecondRowInner>

							{/* Deshboard-Purchase-Section 03-02 신청 연령대별 그래프 */}
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $ai='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} children='신청 연령대별 그래프' />
								<SC.GridBox $gtc="1fr 200px" $gtr="1fr" style={{ width: "100%", height: "100%" }} >
									<SC.FlexBox style={{ width: "100%", height: "100%" }}>
									<SC.CustomLine options={barChartOpts} data={purchaseAgeDonutData} />
									</SC.FlexBox>
									<SC.FlexBox $gap={5} style={{ width: "100%", height: "100%" }}>

										{purchaseLoading ? (
											<div>로딩 중... </div>
										) : purchaseIsError ? (
											<div>서버... 꺼짐...</div>
										) : (
											<>
												<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
													{[
														["10~20대", "chartBlue", `${onReduce(purchaseData.age.values[0])}명`, `${onReduce(purchaseData.age.ratios[0])}%`],
														["30대", "chartSkyblue", `${onReduce(purchaseData.age.values[1])}명`, `${onReduce(purchaseData.age.ratios[1])}%`],
														["40대", "chartGreen", `${onReduce(purchaseData.age.values[2])}명`, `${onReduce(purchaseData.age.ratios[2])}%`],
													].map((legend: any) => (
														<SC.FlexBox key={legend[0]} $gap={5}>
															<SC.RatioBox $size={8} $bColor={legend[1]} />
															<SC.CustomH3 $size={0.5} $color={legend[1]} children={legend[0]} />
															{purchaseReduce && <SC.CustomH3 $size={0.5} children={legend[2]} />}
															{purchaseReduce && legend[3] && <SC.CustomH3 $size={0.5} children={legend[3]}
															/>}
														</SC.FlexBox>
													))}
												</SC.FlexBox>
												<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
													{[
														["50대", "chartYellow", `${onReduce(purchaseData.age.values[3])}명`, `${onReduce(purchaseData.age.ratios[3])}%`],
														["60대", "chartOrange", `${onReduce(purchaseData.age.values[4])}명`, `${onReduce(purchaseData.age.ratios[4])}%`],
														["70대+", "chartRed", `${onReduce(purchaseData.age.values[5])}명`, `${onReduce(purchaseData.age.ratios[5])}%`],
													].map((legend: any) => (
														<SC.FlexBox key={legend[0]} $gap={5}>
															<SC.RatioBox $size={8} $bColor={legend[1]} />
															<SC.CustomH3 $size={0.5} $color={legend[1]} children={legend[0]} />
															{purchaseReduce && <SC.CustomH3 $size={0.5} children={legend[2]} />}
															{purchaseReduce && legend[3] && <SC.CustomH3 $size={0.5} children={legend[3]}
															/>}
														</SC.FlexBox>
													))}
												</SC.FlexBox>
											</>
										)
										}




									</SC.FlexBox>
								</SC.GridBox>

							</SC.PurchaseSecondRowInner>
						</SC.GridBox>
					</SC.ChartInner>
				</SC.GridBox>
			</SC.ChartLayout>

			{/* UserChartLayout //------------------------------------------------- */}
			<DeshboardUser />
		</SC.DeshboardGrid>
	);
};


const CustomDoughnut = styled(Doughnut)`
	max-height:95%;
	max-width:95%;
`



/* <SC.CustomH1 $size={1.125} children='신청 연령대별 그래프' />
								<SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
									<div style={{ width: "120px", height: "120px" }}>
										<Doughnut options={dataRatioOpts} data={purchaseAgeDonutData} />
									</div>
									<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
										{purchaseLoading ? (
											<div>로딩 중... </div>
										) : purchaseIsError ? (
											<div>Error...{JSON.stringify(purchaseError)}</div>
										) : (
											<>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartBlue' />
													<SC.CustomH3 $size={0.875} $color='chartBlue' children='10~20대' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.values[0]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.ratios[0]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartSkyblue' />
													<SC.CustomH3 $size={0.875} $color='chartSkyblue' children='30대' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.values[1]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.ratios[1]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartGreen' />
													<SC.CustomH3 $size={0.875} $color='chartGreen' children='40대' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.values[2]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.ratios[2]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartYellow' />
													<SC.CustomH3 $size={0.875} $color='chartYellow' children='50대' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.values[3]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.ratios[3]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartOrange' />
													<SC.CustomH3 $size={0.875} $color='chartOrange' children='60대' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.values[4]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.ratios[4]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartRed' />
													<SC.CustomH3 $size={0.875} $color='chartRed' children='70대 이상' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.values[5]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.age.ratios[5]}%`}
													/>
												</SC.FlexBox>
											</>
										)}
									</SC.FlexBox>
								</SC.FlexBox> */