import { styled } from "styled-components"
import { Styled } from "../../../types"
import { Flex, Grid } from "../GlobalStyled"

const MyChatRoom = styled.div`
	position: fixed;
	bottom: 10px;
	right: 10px;
`

const MyChatLayout = styled.div<Partial<Styled>>`
	${Grid}
	position: absolute;
	bottom: 60px;
	right: 10px;
	height: 410px;
`

const MyChatInner = styled.div<Partial<Styled>>`
	${Grid}
	width:320px;
	height: 100%;
`

const MyChatVideoInner = styled.div<Partial<Styled>>`
	${Flex}
	position: relative;
	width:320px;
	height: 410px;
`

const MyChatContent = styled.div<Partial<Styled>>`
	padding: 20px;
	${Flex}
	width: 100%;
	gap: 10px;
	max-height: 370px;
	overflow: auto;
  flex-direction: column;
  justify-content: flex-start;
	background: linear-gradient(180deg, #E8E8FB 0%, #F3F3F8 27.08%);
	&::-webkit-scrollbar {
    display: none;
    /* Chrome에서 스크롤바 숨기기 */
  }
`

const MyChatVideo = styled.video<Partial<Styled>>`
  width: 100%;
  height: ${({$types}) => $types === "peerB" ? "230px" : "180px"};
  object-fit: cover;
  transform: scaleX(-1);
`

const MyChatLoadingImg = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  height: 230px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export { MyChatRoom, MyChatLayout, MyChatInner, MyChatVideoInner, MyChatContent, MyChatVideo, MyChatLoadingImg  }