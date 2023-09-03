import React from "react";
import * as SC from "../../components";
import * as Hook from "../../hooks";

export const InnoCar: React.FC = () => {
	// useInnoCarRef에서 제어 중인 Ref와 인터렉티브 동작제어 및 상태관련 배열 호출
	const {
		sectionRef1,
		sectionRef2,
		sectionRef3,
		Sections3ScrollGridText,
		sectionRef4,
		sectionRef5,
		sectionRef6,
		sectionRef7,
		innocarCharacterRef,
		sectionRef3InnerRef,
		sectionRef3FlexRef,
		onToggleCarCharacter,
		onToggleTechnic,
	} = Hook.useInnoCarRef();

	// useModelOne에서 제어 중인 상태에 대한 커스텀훅, 첫번째 섹션의 TechnicalLists 관련 배열을 호출
	const { M1CharacterTitle, TechnicalLists } = Hook.useModelOne();

	return (
		<>
			<SC.SectionFlex ref={sectionRef1} $bColor='white'>
				<SC.FigureObjectFitImg
					width='700px'
					height='300px'
					src={require("../../assets/porshce/porsche-normal.png")}
					alt='porsche-normal'
				/>
				<div onClick={onToggleCarCharacter}> 버튼 </div>

				{/* 모달...  */}
				<SC.Section1ModalLayout ref={innocarCharacterRef}>
					<SC.Artical $ai='flex-start' $fd='column' $gap={15}>
						{/* Artical.Body */}
						<SC.CustomH1 $size={2} children='911 Carrera' />
						<SC.FlexBox>
							{M1CharacterTitle.map((lists, idx) => (
								<SC.FlexBox
									key={idx}
									$fd='column'
									$gap={5}
									$ai='flex-start'
									style={{
										borderRight:
											idx === M1CharacterTitle.length - 1 ? "none" : "1px solid lightgray",
										paddingLeft: idx === 0 ? "0" : "20px",
										paddingRight: "20px",
									}}>
									<SC.CustomH2 children={lists[0]} />
									<SC.CustomH3 $size={0.75} children={lists[1]} />
								</SC.FlexBox>
							))}
						</SC.FlexBox>

						{/* 나가기버튼 */}
						<SC.ExitBtn onClick={onToggleCarCharacter}>
							<SC.ExitLine $rotate={45} />
							<SC.ExitLine $rotate={-45} />
						</SC.ExitBtn>
					</SC.Artical>
					<SC.Artical $height='fin-content' $ai='flex-start' $bColor='white'>
						<div style={{ width: "100%", paddingTop: "50px" }}>
							<SC.CusTomModalH1 $size={2} children='기술 사양' />
							{/* useModelOne에서 호출한 TechnicalLists 배열로 map 실행 */}
							{TechnicalLists.map(
								({ title, technicalInfoCategory, infoBoolean, setInfoBoolean }: any) => (
									<SC.TechnicalListInner
										key={title}
										title={title}
										technicalInfoCategory={technicalInfoCategory}
										onToggle={onToggleTechnic}
										infoBoolean={infoBoolean}
										setInfoBoolean={setInfoBoolean}
									/>
								)
							)}
						</div>
						{/* useModelOne에서 호출한 TechnicalListInnerImg(innoCarImgText) map 실행 */}
						<SC.TechnicalListInnerImg />
					</SC.Artical>
					<SC.Artical />
				</SC.Section1ModalLayout>
			</SC.SectionFlex>

			{/* SectionFlex-sectionRef2 ----------------------------------- */}
			<SC.SectionFlex ref={sectionRef2}>
				<SC.FlexBox as='figure' style={{ width: "100%" }}>
					<SC.Section3Video
						muted
						loop
						autoPlay
						playsInline
						src={`https://finalimgbucket.s3.amazonaws.com/918148fc-55f3-4280-a899-9e78e98adf2a`}
					/>
				</SC.FlexBox>
			</SC.SectionFlex>

			{/* SectionFlex-sectionRef3 ----------------------------------- */}
			<SC.SectionFlex ref={sectionRef3}>
				<SC.Sections3ScrollInnerFlex ref={sectionRef3FlexRef} $fd='column' $gap={20} $ai='flex-start'>
					<SC.CustomH1 $size={2} $color='white' children='버튼을 누르면 솟구치는 아드레날린' />
					<SC.GridBox $gtc='repeat(3, 1fr)'>
						{Sections3ScrollGridText.map((list) => (
							<SC.Sections3ScrollGridInner key={list} children={list} />
						))}
					</SC.GridBox>
				</SC.Sections3ScrollInnerFlex>
				{/* 스크롤 이벤트에 따라서, 글짜 제어하기 */}
				<SC.FigureObjectFitImg
					width='100%'
					height='100%'
					alt='porsche-normal'
					src={"https://finalimgbucket.s3.amazonaws.com/2c6b88b0-f333-44e8-9bcf-12c03d76ebb7"}
				/>
				<SC.Section3ScrollDiv ref={sectionRef3InnerRef} />
			</SC.SectionFlex>

			{/* SectionFlex-sectionRef4 ----------------------------------- */}
			<SC.SectionFlex ref={sectionRef4}>
				<SC.FigureObjectFitImg
					width='100%'
					height='100%'
					alt='porsche-normal'
					src={"https://finalimgbucket.s3.amazonaws.com/f775af66-a592-49bd-b98e-5cc53aa3d54b"}
				/>
			</SC.SectionFlex>

			{/* SectionFlex-sectionRef5 ----------------------------------- */}
			<SC.SectionFlex ref={sectionRef5} />

			{/* SectionFlex-sectionRef6 ----------------------------------- */}
			<SC.SectionFlex ref={sectionRef6}>
				<SC.FigureObjectFitImg
					width='100%'
					height='100%'
					alt='porsche-normal'
					src={"https://finalimgbucket.s3.amazonaws.com/dcfe6735-c214-4fa1-894f-5637f2ac7a6e"}
				/>
			</SC.SectionFlex>

			{/* SectionFlex-sectionRef7 ----------------------------------- */}
			<SC.SectionFlex ref={sectionRef7} />
		</>
	);
};
