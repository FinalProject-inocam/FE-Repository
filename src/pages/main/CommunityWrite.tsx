import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState, DragEvent } from 'react'; // KeyboardEvent
import { useRouter } from '../../hooks'; //useCommunityWrite
import { CustomP, FigureObjectFitImg, Flex, FlexBox, GridBox, PositionRelavite, PostList, cursor } from '../../components';
import { SettingBtn } from '../community/CommunityDetail';
import { css, styled } from 'styled-components';
import { Styled } from '../../types';
import { plus } from '../../assets';
import { selectCommunityForm, setCommunityDate, useAppDispatch, useAppSelector, usePostCommunityMutation } from '../../redux';
import imageCompression from "browser-image-compression";


interface useCommunityWrite {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlurValue: () => void;

}

const useCommunityWrite = (key: string): useCommunityWrite => {
  const [value, setValue] = useState<string>("")
  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const dispatch = useAppDispatch()
  const onBlurValue = () => {
    dispatch(setCommunityDate({ [key]: value }))
  }
  return { value, onChangeValue, onBlurValue }
}

const CommunityFormTitle: React.FC = () => {
  const { value: title, onChangeValue, onBlurValue } = useCommunityWrite("title")

  return <PostWriteTag
    as="input"
    type='text'
    value={title}
    onChange={onChangeValue}
    onBlur={onBlurValue}
    maxLength={40}
    placeholder='제목을 입력해주세요.'
    style={{ display: "block", width: "100%" }} />
}

const CommunityFormTextArea: React.FC = () => {
  const { value: comment, onChangeValue, onBlurValue } = useCommunityWrite("content")

  return (
    <PositionRelavite style={{ width: "100%" }}>
      <CommunityTextArea
        value={comment}
        onChange={onChangeValue}
        onBlur={onBlurValue}
        maxLength={1000}
        placeholder='내용을 입력해주세요' />
      <TextaAreaCount $size={comment.length} children={`${comment.length}/1000`} />
    </PositionRelavite>
  )
}

const CommunityTextArea = styled.textarea`
  width: 100%;
  display: block;
  border-radius: 10px;
  height: 200px;
  resize: none;
  padding: 20px;
  border: 1px solid black;
`

const TextaAreaCount = styled.div<Partial<Styled>>`
	position: absolute;
	bottom: 5px;
	right: 10px;
	font-size: 0.75rem;
	color: ${({ $size, theme }) =>
    ($size as number) === 0
      ? theme.color.black
      : ($size as number) <= 700
        ? theme.color.blue
        : ($size as number) <= 900
          ? theme.color.orange
          : theme.color.red2};
`;


const CommunityFormImgs: React.FC<any> = ({imgs,setImgs}) => {
  const [previewimg, setPreviewimg] = useState<any>([])
  const [resizing, setResizing] = useState<boolean>(false)

  const onActionImgResize = async (files: File): Promise<File | undefined> => {
    const options = {
      maxSizeMB: 1, // 1000000b === 1000kb === 1mb //
      maxWidthOrHeight: 3000,
      useWebWorker: true,
    };
    try {
      const compressBlob = await imageCompression(files, options);
      const compressFile = new File([compressBlob], files.name, {
        type: files.type,
      });
      return compressFile;
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileResize = async (files: FileList | null) => {
    if (files === null) return;
    const fiveMb = 5 * 1024 * 1024;
    // 화면 리사이징 // 파일크기제한(5MB) => 리사이징 => 화면 미리보여주기  
    if (Array.from(files).reduce((pre: number, cur: File) => pre + cur.size, 0) > fiveMb) return alert("Exceeded 5MB.");
    setImgs([]);
    setPreviewimg([]);
    const resizePromises: Promise<File | undefined>[] = [];
    setResizing(true);
  
    for (let i = 0; i < files.length; i++) {
      const resizePromise = onActionImgResize(files[i]);
      resizePromises.push(resizePromise);
    }
  
    const resizedFiles = await Promise.all(resizePromises);
    resizedFiles && setImgs(resizedFiles);
  }

  const onDropFiles = async (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    await handleFileResize(e.dataTransfer.files);
  }

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    await handleFileResize(e.target.files);
  }

  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }

  const onDeleteImg = (idx: number) => () => {
    setPreviewimg([])
    const deleteImg = [...imgs]
    deleteImg.splice(idx, 1)
    console.log("idx", idx, deleteImg)
    setImgs(deleteImg)
  }

  useEffect(() => {
    if (imgs.length > 0) {
      console.log("리사이징 완료", imgs)
      for (let i = 0; i < imgs.length; i++) {
        let file = imgs[i];
        let reader = new FileReader();
        reader.onload = () => {
          setPreviewimg((showImg: (string | ArrayBuffer | null)[]) =>
            showImg ? [...showImg, reader.result] : [reader.result]
          );
        };
        reader.readAsDataURL(file);
      }
      setResizing(false)
    }
  }, [imgs])

  return (
    <>
      <input type="file" id='imgsDragDrop' name='image' accept=".png, .jpg, .jpeg" onChange={onChangeFiles} multiple style={{ display: "none" }} />
      <PostPreImgBox as="label" htmlFor='imgsDragDrop' style={{ width: "100%" }} onDrop={onDropFiles} onDragOver={onDragOver} >
        <FigureObjectFitImg width='3.75vw' height='3.75vw' src={plus} alt='plus' />
      </PostPreImgBox>
      {resizing ? <div>리사이징 중...</div>
        : <GridBox $gtc='repeat(3, 1fr)' $cgap={10} $rgap={10}>
          {/* {Array.from({ length: 3 }, (_, idx: number) => idx).map(perImgBox => ( */}
          {previewimg.length > 0 && previewimg.map((imgs: string, idx: number) => (
            <PostPreImgBox key={imgs} onClick={onDeleteImg(idx)}>
              <FigureObjectFitImg width='100%' height='100%' src={imgs} alt='plus' />
            </PostPreImgBox>
          ))}
        </GridBox>}
    </>
  )
}

export const CommunityWrite: React.FC = () => {
  const { onNavigate } = useRouter()
  const [imgs, setImgs] = useState<any>([])
  const [postTagToggle, setPostTagToggle] = useState<boolean>(false)
  const [postTag, setPostTag] = useState<string>("후기")
  const dispatch = useAppDispatch()
  // const { onChangePost, onChageFile, onSubmitPostPosts, postInfo } = useCommunityWrite()

  const onPostTagToggle = () => {
    setPostTagToggle(pre => !pre)
  }

 
  const onSetPostTag = (tag:string) => (e: MouseEvent<HTMLElement>) => {
    const { dataset: { value } } = e.target as HTMLElement
    value && setPostTag(value)
    dispatch(setCommunityDate({ category:tag }))
    setPostTagToggle(pre => !pre)
  }

  const getCommunityData = useAppSelector(selectCommunityForm)
  const [onPostCommunity,query] = usePostCommunityMutation()
  const onSubmitReview = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(getCommunityData)
    const formData = new FormData()
    formData.append("data", new Blob([JSON.stringify(getCommunityData)], { type: "application/json" }));
    if (imgs) {
			for (let i = 0; i < imgs.length; i++) {
				imgs && formData.append("images", imgs[i]);
			}
		}
    onPostCommunity(formData)
  }
  console.log(query)

  useEffect(() => {
    window.scrollTo(0, 500)
    dispatch(setCommunityDate({ category:"review" }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
      <SettingBtn onClick={onNavigate({ url: "/community/1" })}>
        <CustomP $height="47px" $bColor="white" $size={1.125}>목록으로</CustomP>
      </SettingBtn>

      <FlexBox as="form" $fd='column' $gap={20} style={{ width: "100%" }} onSubmit={onSubmitReview}>
        <GridBox $gtc="144px 1fr" $cgap={20}>
          <div style={{ position: "relative" }}>
            <PostWriteTag onClick={onPostTagToggle}>{postTag}
              <CustomP $height='70px' $size={1.5} style={{ marginLeft: "20px" }}>▼</CustomP>
            </PostWriteTag>
            {postTagToggle && (
            <PostTagSelector $fd='column' $gap={5} $size={50 * 2}>
              <CustomP style={{ width: "100%" }} $height='50px' data-value="후기" onClick={onSetPostTag("review")}>후기</CustomP>
              <CustomP style={{ width: "100%" }} $height='50px' data-value="자유" onClick={onSetPostTag("free")}>자유</CustomP>
            </PostTagSelector>)}
          </div>
          <CommunityFormTitle />
        </GridBox>
        <PostList $jc="flex-start" $gap={20} >
          <CommunityFormTextArea />
          <CommunityFormImgs imgs={imgs} setImgs={setImgs}/>
        </PostList>
        <input type='submit'  style={{ width: "100%", height: "70px", backgroundColor: "blue", borderRadius: "10px", color:"white", fontSize:"1.25rem" }} value="작성"/> 
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
  z-index:20;
`

const PostPreImgBox = styled.div`
  ${Flex}
  ${cursor}
  height: 11.18vw;
  max-height: 161px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.lightgray1};
  border: 1px solid ${({ theme }) => theme.color.lightgray2};
`