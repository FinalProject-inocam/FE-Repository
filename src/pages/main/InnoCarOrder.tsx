import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import * as COMP from "../../components";
import * as SC from "../../components";
import * as Type from "../../types";
import { preArrow, nextArrow } from "../../assets";
import * as RTK from "../../redux";
import { useSelector } from "react-redux";

export const InnoCarOrder: React.FC = () => {
  const dispatch = RTK.useAppDispatch();
  const slideRef = useRef<HTMLInputElement | null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [trimPrice, setTrimPrice] = useState<number>(0);
  const [colorPrice, setColorPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultModal, setResultModal] = useState(false);

  const [carColor, setCarColor] = useState<string>("화이트 (white)");

  const carColors = [
    ["white", "화이트 (white)"],
    ["gray", "그레이 (gray)"],
    ["red", "레드 (red)"],
    ["black", "블랙 (black)"],
    ["wine", "와인 (wine)"],
    ["yellow", "옐로우 (yellow)"],
  ];

  const orderLayoutRef = useRef<HTMLDivElement | null>(null);

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);
  const inputRef5 = useRef<HTMLInputElement | null>(null);

  const orderInfo = useSelector(RTK?.selectInnoCarOrder);

  console.log(!!orderInfo?.gender);

  const slideWidth = 500;
  const totalPage = 3;

  const onClickPrevBtn = () => {
    setSlideIndex(Math.max(slideIndex - 1, 0));
    updateSlidePosition();
  };

  const onClickNextBtn = () => {
    setSlideIndex(Math.min(slideIndex + 1, totalPage));
    updateSlidePosition();

    dispatch(RTK.setInnocarOrderData({ price: trimPrice + colorPrice }));
  };

  // 마지막 버튼 눌렀을 때 테두리만 바뀌게 하기, 전송해서 에러메세지 받고 난 뒤!
  const nameValue = inputRef1.current?.value;
  const birthValue = inputRef2.current?.value;
  const phoneValue = inputRef3.current?.value;
  const zoneNoValue = inputRef4.current?.value;
  const addressValue = inputRef5.current?.value;
  const genderValue = !!orderInfo?.gender;

  const getCarOrderInfo = RTK.useAppSelector(RTK.selectInnoCarOrder);

  const [onPostPurchase, { isSuccess, isError, error }] =
    RTK.usePostPurchasesMutation();

  const onClickDoneBtn = () => {
    if (
      nameValue &&
      birthValue &&
      phoneValue &&
      zoneNoValue &&
      addressValue &&
      genderValue
    ) {
      onPostPurchase(getCarOrderInfo);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    isSuccess && setResultModal(true);
    isError && console.log(error);
  }, [isSuccess, isError, error]);

  const updateSlidePosition = useCallback(() => {
    const offset = -slideIndex * slideWidth;
    if (slideRef.current)
      slideRef.current.style.transform = `translateX(${offset}px)`;
  }, [slideIndex]);

  useEffect(() => {
    updateSlidePosition();
  }, [slideIndex, updateSlidePosition]);

  useEffect(() => {
    dispatch(RTK.deleteInnocarOrderData());
    dispatch(RTK.setInnocarOrderData({ [`type`]: "INNO-Create I" }));
    dispatch(RTK.setInnocarOrderData({ [`trim`]: "INNO I Air" }));
    dispatch(RTK.setInnocarOrderData({ [`alarm`]: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(RTK.setInnocarOrderData({ [`color`]: carColor }));
  }, [dispatch, carColor]);

  useEffect(() => {
    orderLayoutRef.current &&
      (orderLayoutRef.current.style.height = `${window.innerHeight}px`);
    resultModal &&
      orderLayoutRef.current &&
      (orderLayoutRef.current.style.overflow = "hidden");
  }, [orderLayoutRef, resultModal]);

  return (
    <div>
      <Section $gtc="1fr 500px" ref={orderLayoutRef}>
        <COMP.InnoCarPictures carColor={carColor} />

        <Carousel>
          <CarouselContainer ref={slideRef}>
            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <CarOptionInfo>트림 선택</CarOptionInfo>
              <COMP.InnoCarOrderTrim setTrimPrice={setTrimPrice} />
            </CarouselSlide>

            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <CarOptionInfo>컬러 선택</CarOptionInfo>
              <COMP.InnoCarOrderColor
                colorPrice={colorPrice}
                setColorPrice={setColorPrice}
                carColor={carColor}
                setCarColor={setCarColor}
                carColors={carColors}
              />
            </CarouselSlide>

            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <SC.FlexBox $ai={"end"} $jc={"none"}>
                <CarOptionInfo>신청자 정보</CarOptionInfo>
                <WarningText>* 는 필수 입력 항목 입니다.</WarningText>
              </SC.FlexBox>
              <COMP.InnoCarOrderUser
                inputRef1={inputRef1}
                inputRef2={inputRef2}
                inputRef3={inputRef3}
                inputRef4={inputRef4}
                inputRef5={inputRef5}
              />
            </CarouselSlide>

            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <CarOptionInfo>문의 사항</CarOptionInfo>
              <COMP.UserContent />
            </CarouselSlide>
          </CarouselContainer>
        </Carousel>
        <PageBtnLayout $gap={10}>
          {slideIndex === 0 ? (
            <PageBtn onClick={onClickNextBtn} $direction="right">
              컬러 선택
              <PageArrow src={nextArrow} $direction="right" alt="화살표" />
            </PageBtn>
          ) : slideIndex === 1 ? (
            <>
              <PageBtn onClick={onClickPrevBtn} $direction="left">
                <PageArrow src={preArrow} $direction="left" alt="화살표" />
                트림 선택
              </PageBtn>
              <PageBtn onClick={onClickNextBtn} $direction="right">
                정보 입력
                <PageArrow src={nextArrow} $direction="right" alt="화살표" />
              </PageBtn>
            </>
          ) : slideIndex === 2 ? (
            <>
              <PageBtn onClick={onClickPrevBtn} $direction="left">
                <PageArrow src={preArrow} $direction="left" alt="화살표" />
                컬러 선택
              </PageBtn>
              <PageBtn onClick={onClickNextBtn} $direction="right">
                문의 사항
                <PageArrow src={nextArrow} $direction="right" alt="화살표" />
              </PageBtn>
            </>
          ) : (
            <>
              <PageBtn onClick={onClickPrevBtn} $direction="left">
                <PageArrow src={preArrow} $direction="left" alt="화살표" />
                정보 입력
              </PageBtn>
              <PageBtn onClick={onClickDoneBtn} $direction="end">
                신청 완료
                <PageArrow src={nextArrow} $direction="right" alt="화살표" />
              </PageBtn>
            </>
          )}
        </PageBtnLayout>
        {resultModal && <COMP.InnoCarOrderDone />}
      </Section>
      {isModalOpen && (
        <COMP.Modal state={true} setState={setIsModalOpen}>
          신청자 정보를 입력하세요
        </COMP.Modal>
      )}
    </div>
  );
};

const Section = styled.div<Partial<Type.Styled>>`
  ${SC.Grid}
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const Carousel = styled.div`
  overflow: hidden;
  width: 500px;
  height: 100%;
  padding-top: 90px;
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  height: 100%;
`;

const CarouselSlide = styled.div`
  flex: 0 0 500px;
  padding: 40px;
  height: calc(100vh - 186px); //186px = 헤더(90) + 바닥(96) 넉넉잡아
  overflow: auto;
`;

const CarNameInfo = styled.div`
  ${({ theme }) => theme.font.PretendardSB}
  height: 50px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5%;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightgray4};
`;

const CarOptionInfo = styled.div<Partial<Type.Styled>>`
  display: flex;
  ${({ theme }) => theme.font.PretendardSB}
  padding: 30px 0 10px;
  font-size: 20px;
  font-weight: 600;
`;

const PageBtnLayout = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 24px 48px;
  height: 96px;
  width: 500px;
  border-top: 1px solid ${({ theme }) => theme.color.lightgray4};
`;

const PageBtn = styled.div<Partial<Type.Styled>>`
  ${SC.cursor}
  ${SC.Flex}
  width: 100%; //하나일때 두개일때 크기 통일하려고
  height: 48px;
  line-height: 18px;
  border: 1px solid #9fa5a9;
  background-color: ${({ $direction, theme }) =>
    $direction === "end"
      ? theme.color.blue
      : $direction === "left"
      ? "white"
      : "#05141f"};
  color: ${({ $direction }) => ($direction === "left" ? "inherit" : "white")};
`;

const PageArrow = styled.img<Partial<Type.Styled>>`
  transform: ${({ $direction }) =>
    $direction === "left" ? "rotate(90deg)" : "rotate(-90deg)"};
  margin: ${({ $direction }) =>
    $direction === "left" ? "0 8px 0 0" : "0 0 0 8px"};
`;

const WarningText = styled.div`
  ${({ theme }) => theme.font.PretendardR}
  font-size: 12px;
  color: ${({ theme }) => theme.color.red};
  padding-bottom: 10px;
  padding-left: 10px;
`;
