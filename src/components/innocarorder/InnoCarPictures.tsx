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
    화이트: [
      "https://finalimgbucket.s3.amazonaws.com/8268c40d-67f7-450e-8b80-e183db3e6456",
      "https://finalimgbucket.s3.amazonaws.com/41217304-7cfa-4a2e-9b24-833eefb69af5",
    ],
    그레이: [
      "https://finalimgbucket.s3.amazonaws.com/55e69d83-2229-485c-83ec-abb9cd296ae7",
      "https://finalimgbucket.s3.amazonaws.com/35b04c0c-e152-4d33-96d8-461b1c560bff",
    ],
    레드: [
      "https://finalimgbucket.s3.amazonaws.com/74477a91-9d38-40b1-b4f2-1be5f69568a6",
      "https://finalimgbucket.s3.amazonaws.com/74477a91-9d38-40b1-b4f2-1be5f69568a6",
    ],
    블랙: [
      "https://finalimgbucket.s3.amazonaws.com/7ad61437-5da9-4438-a156-32bc10b64325",
      "https://finalimgbucket.s3.amazonaws.com/7ad61437-5da9-4438-a156-32bc10b64325",
    ],
    와인: [
      "https://finalimgbucket.s3.amazonaws.com/cf8e1578-187a-46ec-852d-361c6bee684a",
      "https://finalimgbucket.s3.amazonaws.com/1b212174-e468-4392-9b1c-83c9a0e205bb",
    ],
    옐로우: [
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
  background-color: black;
  width: calc(100vw - 500px);
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  margin-top: 5%;
  position: relative;
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
