import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { css, styled } from "styled-components";
import { preArrow } from "../../assets";
import { Styled } from "../../types";

interface CarPicturesList {
  [key: string]: string[];
}

export const InnoCarPictures: FC<{ carColor: string }> = ({ carColor }) => {
  const carPicturesList: CarPicturesList = {
    "화이트 (white)": [
      "https://finalimgbucket.s3.amazonaws.com/8268c40d-67f7-450e-8b80-e183db3e6456",
      "https://finalimgbucket.s3.amazonaws.com/41217304-7cfa-4a2e-9b24-833eefb69af5",
    ],
    "그레이 (gray)": [
      "https://finalimgbucket.s3.amazonaws.com/c7859019-346a-4e00-991a-17f82cff46af",
      "https://finalimgbucket.s3.amazonaws.com/35b04c0c-e152-4d33-96d8-461b1c560bff",
    ],
    "레드 (red)": [
      "https://finalimgbucket.s3.amazonaws.com/74477a91-9d38-40b1-b4f2-1be5f69568a6",
      "https://finalimgbucket.s3.amazonaws.com/c72e3d70-747d-4302-ba5b-985a3be112cf",
    ],
    "블랙 (black)": [
      "https://finalimgbucket.s3.amazonaws.com/7ad61437-5da9-4438-a156-32bc10b64325",
      "https://finalimgbucket.s3.amazonaws.com/662806f0-67fa-4e98-bbd0-9424cdfdbaa8",
    ],
    "와인 (wine)": [
      "https://finalimgbucket.s3.amazonaws.com/3142f3e0-d7b4-4f61-8893-40cae508a85a",
      "https://finalimgbucket.s3.amazonaws.com/1b212174-e468-4392-9b1c-83c9a0e205bb",
    ],
    "옐로우 (yellow)": [
      "https://finalimgbucket.s3.amazonaws.com/d377d950-5142-4f0e-9b90-b6224a0266ad",
      "https://finalimgbucket.s3.amazonaws.com/39920fae-4591-4070-8d8d-d9a942d8d675",
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <ArrowBox $direction="right">
        <Arrow src={preArrow} alt="arrow" />
      </ArrowBox>
    ),
    prevArrow: (
      <ArrowBox $direction="left">
        <Arrow src={preArrow} alt="arrow" />
      </ArrowBox>
    ),
  };

  const selectedCarImages = carPicturesList[carColor] || [];

  return (
    <CarLayout>
      <StyledSlider {...settings}>
        {selectedCarImages.map((imageUrl: string, index: number) => (
          <CarImage key={index} src={imageUrl} alt={`car ${index + 1}`} />
        ))}
      </StyledSlider>
    </CarLayout>
  );
};

const CarLayout = styled.div`
  position: relative;
  margin-top: 90px;
  background-color: white;
  width: calc(100vw - 500px);
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  position: relative;
  margin-top: 2%;
  height: 100%;

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  .slick-dots {
    bottom: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .slick-dots li {
    margin: 0 5px;
  }

  .slick-dots li button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArrowBox = styled.div<Partial<Styled>>`
  width: 70px;
  height: 70px;
  position: absolute;
  z-index: 3;

  transform: ${({ $direction }) =>
    $direction === "left" ? "rotate(90deg)" : "rotate(-90deg)"};

  ${({ $direction }) =>
    $direction === "left"
      ? css`
          left: 1%;
        `
      : css`
          right: 1%;
        `};
`;

const Arrow = styled.img`
  width: 100%;
  height: 100%;
`;
