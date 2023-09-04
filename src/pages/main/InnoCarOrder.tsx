import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import {
  cursor,
  Flex,
  Grid,
  InnoCarOrderColor,
  InnoCarOrderTrim,
  InnoCarOrderUser,
  InnoCarPictures,
} from "../../components";
import { Styled } from "../../types";
import { preArrow, nextArrow } from "../../assets";
import * as RTK from "../../redux";

export const InnoCarOrder: React.FC = () => {
  const dispatch = RTK.useAppDispatch();
  const slideRef = useRef<HTMLInputElement | null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [trimPrice, setTrimPrice] = useState<number>(0);
  const [colorPrice, setColorPrice] = useState<number>(0);

  const [carColor, setCarColor] = useState<string>("화이트");

  const carColors = [
    ["white", "화이트"],
    ["gray", "그레이"],
    ["red", "레드"],
    ["black", "블랙"],
    ["wine", "와인"],
    ["yellow", "옐로우"],
  ];

  const slideWidth = 500;
  const totalPage = 2;

  const onClickPrevButton = () => {
    setSlideIndex(Math.max(slideIndex - 1, 0));
    updateSlidePosition();
  };

  const onClickNextButton = () => {
    setSlideIndex(Math.min(slideIndex + 1, totalPage));
    updateSlidePosition();

    dispatch(RTK.setInnocarOrderData({ price: trimPrice + colorPrice }));
  };

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
  }, [dispatch]);

  return (
    <div>
      <Section $gtc="1fr 500px">
        <InnoCarPictures carColor={carColor} />

        <Carousel>
          <CarouselContainer ref={slideRef}>
            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <CarOptionInfo>트림 선택</CarOptionInfo>
              <InnoCarOrderTrim setTrimPrice={setTrimPrice} />
            </CarouselSlide>

            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <CarOptionInfo>컬러 선택</CarOptionInfo>
              <InnoCarOrderColor
                colorPrice={colorPrice}
                setColorPrice={setColorPrice}
                carColor={carColor}
                setCarColor={setCarColor}
                carColors={carColors}
              />
            </CarouselSlide>

            <CarouselSlide>
              <CarNameInfo>INNO-Create I</CarNameInfo>
              <CarOptionInfo>신청자 정보</CarOptionInfo>
              <InnoCarOrderUser />
            </CarouselSlide>
          </CarouselContainer>
        </Carousel>
        <PageBtnLayout $gap={10}>
          {slideIndex === 0 ? (
            <PageBtn onClick={onClickNextButton} $direction="right">
              컬러 선택
              <PageArrow src={nextArrow} $direction="right" alt="화살표" />
            </PageBtn>
          ) : (
            <>
              <PageBtn onClick={onClickPrevButton} $direction="left">
                <PageArrow src={preArrow} $direction="left" alt="화살표" />
                트림 선택
              </PageBtn>
              <PageBtn onClick={onClickNextButton} $direction="right">
                정보 입력
                <PageArrow src={nextArrow} $direction="right" alt="화살표" />
              </PageBtn>
            </>
          )}
        </PageBtnLayout>
      </Section>
    </div>
  );
};

const Section = styled.div<Partial<Styled>>`
  ${Grid}
  width: 100vw;
  height: 100vh;
  padding-top: 90px; // 헤더자리 비움
`;

const Carousel = styled.div`
  overflow: hidden;
  width: 500px;
  height: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  height: 100%;
`;

const CarouselSlide = styled.div`
  flex: 0 0 500px;
  padding: 40px;
`;

const CarNameInfo = styled.div`
  ${({ theme }) => theme.font.PretendardSB}
  height: 85px;
  font-size: 34px;
  font-weight: 600;
  letter-spacing: 5%;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightgray4};
`;

const CarOptionInfo = styled.div<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardSB}
  padding: 30px 0;
  font-size: 24px;
  font-weight: 600;
`;

const PageBtnLayout = styled.div<Partial<Styled>>`
  ${Flex}
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 24px 48px;
  height: 96px;
  width: 500px;
  border-top: 1px solid ${({ theme }) => theme.color.lightgray4};
`;

const PageBtn = styled.div<Partial<Styled>>`
  ${cursor}
  ${Flex}
  width: 100%; //하나일때 두개일때 크기 통일하려고
  height: 48px;
  line-height: 18px;
  border: 1px solid #9fa5a9;
  background-color: ${({ $direction }) =>
    $direction === "left" ? "white" : "#05141f"};
  color: ${({ $direction }) => ($direction === "left" ? "inherit" : "white")};
`;

const PageArrow = styled.img<Partial<Styled>>`
  transform: ${({ $direction }) =>
    $direction === "left" ? "rotate(90deg)" : "rotate(-90deg)"};
  margin: ${({ $direction }) =>
    $direction === "left" ? "0 8px 0 0" : "0 0 0 8px"};
`;
