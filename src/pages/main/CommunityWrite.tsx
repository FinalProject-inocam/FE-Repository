import React, { MouseEvent, useEffect, useState } from 'react';
import { useCommunityWrite, useRouter } from '../../hooks';
import { CustomP, FigureObjectFitImg, Flex, FlexBox, GridBox, PostList } from '../../components';
import { SettingBtn } from '../community/CommunityDetail';
import { css, styled } from 'styled-components';
import { Styled } from '../../types';
import { plus } from '../../assets';


export const CommunityWrite: React.FC = () => {
  const { onNavigate } = useRouter()
  const [postTagToggle, setPostTagToggle] = useState<boolean>(false)
  const [postTag, setPostTag] = useState<string>("후기")
  const { onChangePost, onChageFile, onSubmitPostPosts, postInfo } = useCommunityWrite()
  console.log(onChangePost, onChageFile, onSubmitPostPosts, postInfo)

  const onPostTagToggle = () => {
    setPostTagToggle(pre => !pre)
  }

  const onSetPostTag = (e: MouseEvent<HTMLElement>) => {
    const { dataset: { value } } = e.target as HTMLElement
    value && setPostTag(value)
    setPostTagToggle(pre => !pre)
  }

  useEffect(() => {
    window.scrollTo(0, 500)
  }, [])

  return (

    <FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
      <SettingBtn onClick={onNavigate({ url: "/community/1" })}>
        <CustomP $height="47px" $bColor="white" $size={1.125}>목록으로</CustomP>
      </SettingBtn>
      <FlexBox as="form" $fd='column' $gap={20} style={{ width: "100%" }}>
        <GridBox $gtc="144px 1fr" $cgap={20}>
          <div style={{ position: "relative" }}>
            <PostWriteTag onClick={onPostTagToggle}>{postTag}
              <CustomP $height='70px' $size={1.5} style={{ marginLeft: "20px" }}>▼</CustomP>
            </PostWriteTag>
            {postTagToggle && (<PostTagSelector $fd='column' $gap={5} $size={50 * 2}>
              <CustomP $height='50px' data-value="후기" onClick={onSetPostTag}>후기</CustomP>
              <CustomP $height='50px' data-value="자유" onClick={onSetPostTag}>자유</CustomP>
            </PostTagSelector>)}
          </div>
          <PostWriteTag as="input" type='text' placeholder='제목을 입력해주세요.' style={{ display: "block", width: "100%" }} />
        </GridBox>
        <PostList $jc="flex-start" $gap={20} >
          <textarea
            placeholder='내용을 입력해주세요'
            style={{ width: "100%", display: "block", borderRadius: "10px", height: "200px", resize: "none", padding: "20px", border: "1px solid black" }} />
          <GridBox $gtc='repeat(3, 1fr)' $cgap={10}>
            {Array.from({ length: 3 }, (_, idx: number) => idx).map(perImgBox => (
              <PostPreImgBox key={perImgBox}>
                <FigureObjectFitImg width='100px' height='100px' src={plus} alt='plus' />
              </PostPreImgBox>
            ))}
          </GridBox>
        </PostList>
        <div style={{ width: "100%", height: "70px", backgroundColor: "blue", borderRadius: "10px" }}><CustomP $height="70px" $bColor="blue" $size={1.25}>작성</CustomP></div>
      </FlexBox>

    </FlexBox>
  )
};

const PostWriteTag = styled.div`
  ${Flex}
  font-size: 1.5rem;
  font-weight: 800;
  border-radius: 10px;
  min-height: 70px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: ${({ theme }) => theme.color.white};

  ${({ as }) => as === "input" && css`padding: 10px 30px;`}
`

const PostTagSelector = styled(PostWriteTag) <Partial<Styled>>`
  position: absolute;
  bottom: ${({ $gap, $size }) => $gap && $size && `calc(-${$gap + $size + 10}px)`};
  width: 100%;
`

const PostPreImgBox = styled.div`
  ${Flex}
  height: 161px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightgray1};
  border: 1px solid ${({ theme }) => theme.color.lightgray2};
`


/*
    <form onSubmit={onSubmitPostPosts}>
      <input type="text" value={postInfo.title} name='title' onChange={onChangePost} placeholder='제목을 입력해 주세요' />
      <input type="text" value={postInfo.content} name='content' onChange={onChangePost} placeholder='내용을 입력해 주세요' />
      <input type="file" name='image' accept=".png, .jpg, .jpeg" onChange={onChageFile} />
      <input type="submit" value="제출하기"/>
    </form>

*/