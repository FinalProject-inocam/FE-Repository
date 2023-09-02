import React from "react";
import * as SC from "../../components";
import {
	Chart as ChartJS,
	BarElement,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	RadialLinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Doughnut, PolarArea } from "react-chartjs-2";
import * as ASS from "../../assets";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAdminDeshboard } from "../../hooks/admin";
dayjs.locale("ko");
ChartJS.register(
	ArcElement,
	Tooltip,
	BarElement,
	LineElement,
	PointElement,
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
		userError,
		userData,
		purchaseLoading,
		purchaseIsError,
		purchaseError,
		purchaseData,

		// Chart
		dataRatioOpts,
		barChartOpts,
		userGenderRatio,
		userAgeRatio,
		purchaseRatio,
		purchaseLineData,
		purchaseReduce,
		approveReduce,
		cancelReduce,
		purchaseGenderDonutData,
		purchaseAgeDonutData,
	} = useAdminDeshboard();

	return (
		<SC.DeshboardGrid $gtc='1fr 380px' $gtr='1fr' style={{ width: "100%" }}>
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
									<div>Error...{JSON.stringify(userError)}</div>
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
									<div>Error...{JSON.stringify(userError)}</div>
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
						<SC.GridBox $gtc='300px 2fr' style={{ width: "100%", height: "100%" }} $cgap={10}>
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $ai='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} children='전체 출고현황 그래프' />
								<SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
									<div style={{ width: "120px", height: "120px" }}>
										<Doughnut options={dataRatioOpts} data={purchaseRatio} />
									</div>
									<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
										{userLoading ? (
											<div>로딩 중... </div>
										) : userIsError ? (
											<div>서버... 꺼짐...</div>
										) : (
											<>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='blue' />
													<SC.CustomH3 $size={0.875} $color='blue' children='신청' />
													<SC.CustomH3 $size={0.875} children={`${purchaseReduce}건`} />
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='chartGreen' />
													<SC.CustomH3 $size={0.875} $color='chartGreen' children='확정' />
													<SC.CustomH3 $size={0.875} children={`${approveReduce}건`} />
													<SC.CustomH3
														$size={0.875}
														children={`${((approveReduce / purchaseReduce) * 100).toFixed(
															1
														)}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='red3' />
													<SC.CustomH3 $size={0.875} $color='red3' children='취소' />
													<SC.CustomH3 $size={0.875} children={`${cancelReduce}건`} />
													<SC.CustomH3
														$size={0.875}
														children={`${((cancelReduce / purchaseReduce) * 100).toFixed(
															1
														)}%`}
													/>
												</SC.FlexBox>
											</>
										)}
									</SC.FlexBox>
								</SC.FlexBox>
							</SC.PurchaseSecondRowInner>
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start'>
								<SC.CustomH1 $size={1.125} style={{ width: "100%" }} children='주간 출고현황 그래프' />
								<SC.FlexBox $gap={10} $jc='flex-end' style={{ width: "100%" }}>
									<SC.FlexBox $gap={5}>
										<SC.RatioBox $size={8} $bColor='blue' />
										<SC.CustomH3 $size={0.5} $color='blue' children='신청' />
									</SC.FlexBox>
									<SC.FlexBox $gap={5}>
										<SC.RatioBox $size={8} $bColor='chartGreen' />
										<SC.CustomH3 $size={0.5} $color='chartGreen' children='확정' />
									</SC.FlexBox>
									<SC.FlexBox $gap={5}>
										<SC.RatioBox $size={8} $bColor='red3' />
										<SC.CustomH3 $size={0.5} $color='red3' children='취소' />
									</SC.FlexBox>
								</SC.FlexBox>
								<SC.FlexBox style={{ width: "100%", height: "100%" }}>
									<SC.CustomBar options={barChartOpts} data={purchaseLineData} />
								</SC.FlexBox>
							</SC.PurchaseSecondRowInner>
						</SC.GridBox>
					</SC.ChartInner>

					{/* 하단 그래프 */}
					<SC.ChartInner $types='left'>
						<SC.GridBox $gtc='300px 2fr' style={{ width: "100%", height: "100%" }} $cgap={10}>
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $ai='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} children='신청 성별 그래프' />
								<SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
									<div style={{ width: "120px", height: "120px" }}>
										<Doughnut options={dataRatioOpts} data={purchaseGenderDonutData} />
									</div>
									<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
										{purchaseLoading ? (
											<div>로딩 중... </div>
										) : purchaseIsError ? (
											<div>Error...{JSON.stringify(purchaseError)}</div>
										) : (
											<>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='blue' />
													<SC.CustomH3 $size={0.875} $color='blue' children='남성' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.gender.values[0]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.gender.ratios[0]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='red3' />
													<SC.CustomH3 $size={0.875} $color='red3' children='여성' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.gender.values[1]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.gender.ratios[1]}%`}
													/>
												</SC.FlexBox>
												<SC.FlexBox $gap={5}>
													<SC.RatioBox $size={14} $bColor='textColorSub' />
													<SC.CustomH3 $size={0.875} $color='textColorSub' children='미상' />
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.gender.values[2]}건`}
													/>
													<SC.CustomH3
														$size={0.875}
														children={`${purchaseData.gender.ratios[2]}%`}
													/>
												</SC.FlexBox>
											</>
										)}
									</SC.FlexBox>
								</SC.FlexBox>
							</SC.PurchaseSecondRowInner>
							<SC.PurchaseSecondRowInner $fd='column' $jc='flex-start' $ai='flex-start' $gap={10}>
								<SC.CustomH1 $size={1.125} children='신청 성별 그래프' />
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
								</SC.FlexBox>
							</SC.PurchaseSecondRowInner>
						</SC.GridBox>
					</SC.ChartInner>
				</SC.GridBox>
			</SC.ChartLayout>

			{/* UserChartLayout //------------------------------------------------- */}
			<SC.ChartLayout $bColor='blue' $padding='40px 10px'>
				<SC.FlexBox $jc='space-between' style={{ height: "42px" }}>
					<SC.CustomH1 $size={1.5} $color='white' children='회원관리' />
				</SC.FlexBox>
				<SC.GridBox
					$gtc='1fr'
					$gtr='180px repeat(2, 1fr)'
					style={{ height: "calc(100% - 40px)", marginTop: "10px" }}
					$rgap={10}>
					<SC.ChartInner $fd='column' $ai='flex-start' $gap={10}>
						<SC.CustomH1 $size={1.125} children='회원정도 연간통계' />
						<SC.GridBox style={{ height: "100%" }} $gap={4}>
							{userLoading ? (
								<div>로딩 중... </div>
							) : userIsError ? (
								<div>서버... 꺼짐...</div>
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
										<SC.CustomH3 $size={0.75} $color='textColorSub' children='가입 회원 수' />
										<SC.CustomH3
											$size={1.5}
											children={
												<>
													13
													<span children='건' />
													<span
														style={{
															color: 13 - userData.preUser >= 0 ? "red" : "blue",
															marginLeft: "5px",
															fontSize: "12px",
														}}
														children={`${
															13 - userData.preUser >= 0
																? "↑" + (13 - userData.preUser)
																: "↓" + (13 - userData.preUser)
														}명`}
													/>
												</>
											}
										/>
										<SC.CustomH3
											$size={0.75}
											$color='textColorSub'
											children={`작년, ${userData.preUser}명`}
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
										<SC.CustomH3
											$size={0.75}
											$color='textColorSub'
											children='이번달 가입 회원 수'
										/>
										<SC.CustomH3
											$size={1.5}
											children={
												<>
													5<span children='건' />
												</>
											}
										/>
										<SC.CustomH3 $size={0.75} style={{ visibility: "visible", height: "15px" }} />
									</SC.FlexBox>
								</>
							)}
						</SC.GridBox>
					</SC.ChartInner>
					<SC.ChartInner>
						<SC.FlexBox
							$fd='column'
							$jc='flex-start'
							$ai='flex-start'
							$gap={10}
							style={{ width: "100%", height: "100%" }}>
							<SC.CustomH1 $size={1.125} children='회원 성별통계' />
							<SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
								<div style={{ width: "150px", height: "150px" }}>
									<Doughnut options={dataRatioOpts} data={userGenderRatio} />
								</div>
								<SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
									{userLoading ? (
										<div>로딩 중... </div>
									) : userIsError ? (
										<div>Error...{JSON.stringify(userError)}</div>
									) : (
										<>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='blue' />
												<SC.CustomH3 $size={0.875} $color='blue' children='남성' />
												<SC.CustomH3
													$size={0.875}
													children={`${userData.gender.byGender.MALE}명`}
												/>
												<SC.CustomH3
													$size={0.875}
													children={`${userData.gender.ratio.MALE}%`}
												/>
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='red3' />
												<SC.CustomH3 $size={0.875} $color='red3' children='여성' />
												<SC.CustomH3
													$size={0.875}
													children={`${userData.gender.byGender.FEMALE}명`}
												/>
												<SC.CustomH3
													$size={0.875}
													children={`${userData.gender.ratio.FEMALE}%`}
												/>
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='textColorSub' />
												<SC.CustomH3 $size={0.875} $color='textColorSub' children='알수없음' />
												<SC.CustomH3
													$size={0.875}
													children={`${userData.gender.byGender.UNKNOWN}명`}
												/>
												<SC.CustomH3
													$size={0.875}
													children={`${userData.gender.ratio.UNKNOWN}%`}
												/>
											</SC.FlexBox>
										</>
									)}
								</SC.FlexBox>
							</SC.FlexBox>
						</SC.FlexBox>
					</SC.ChartInner>
					<SC.ChartInner>
						<SC.FlexBox
							$fd='column'
							$jc='flex-start'
							$ai='flex-start'
							$gap={10}
							style={{ width: "100%", height: "100%" }}>
							<SC.CustomH1 $size={1.125} children='회원 연령통계' />
							<SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
								<div style={{ width: "150px", height: "150px" }}>
									<PolarArea options={dataRatioOpts} data={userAgeRatio} />
								</div>
								<SC.FlexBox $fd='column' $gap={10} $ai='flex-start'>
									{userLoading ? (
										<div>로딩 중... </div>
									) : userIsError ? (
										<div>Error...{JSON.stringify(userError)}</div>
									) : (
										<>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='chartBlue' />
												<SC.CustomH3 $size={0.875} $color='chartBlue' children='10~20대' />
												<SC.CustomH3 $size={0.875} children={`${userData.age.byAge["20"]}명`} />
												<SC.CustomH3 $size={0.875} children={`${userData.age.ratio["20"]}%`} />
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='chartSkyblue' />
												<SC.CustomH3 $size={0.875} $color='chartSkyblue' children='30대' />
												<SC.CustomH3 $size={0.875} children={`${userData.age.byAge["30"]}명`} />
												<SC.CustomH3 $size={0.875} children={`${userData.age.ratio["30"]}%`} />
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='chartGreen' />
												<SC.CustomH3 $size={0.875} $color='chartGreen' children='40대' />
												<SC.CustomH3 $size={0.875} children={`${userData.age.byAge["40"]}명`} />
												<SC.CustomH3 $size={0.875} children={`${userData.age.ratio["40"]}%`} />
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='chartYellow' />
												<SC.CustomH3 $size={0.875} $color='chartYellow' children='50대' />
												<SC.CustomH3 $size={0.875} children={`${userData.age.byAge["50"]}명`} />
												<SC.CustomH3 $size={0.875} children={`${userData.age.ratio["50"]}%`} />
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='chartOrange' />
												<SC.CustomH3 $size={0.875} $color='chartOrange' children='60대' />
												<SC.CustomH3 $size={0.875} children={`${userData.age.byAge["60"]}명`} />
												<SC.CustomH3 $size={0.875} children={`${userData.age.ratio["60"]}%`} />
											</SC.FlexBox>
											<SC.FlexBox $gap={5}>
												<SC.RatioBox $size={14} $bColor='chartRed' />
												<SC.CustomH3 $size={0.875} $color='chartRed' children='70대 이상' />
												<SC.CustomH3
													$size={0.875}
													children={`${userData.age.byAge["70+"]}명`}
												/>
												<SC.CustomH3 $size={0.875} children={`${userData.age.ratio["70+"]}%`} />
											</SC.FlexBox>
										</>
									)}
								</SC.FlexBox>
							</SC.FlexBox>
						</SC.FlexBox>
					</SC.ChartInner>
				</SC.GridBox>
			</SC.ChartLayout>
		</SC.DeshboardGrid>
	);
};
