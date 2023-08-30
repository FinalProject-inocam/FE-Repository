import { FC } from "react";
import { FigureObjectFitImg, GridBox, PostPreImgBox } from "../..";
import { plus } from "../../../assets";
import { useCommunityFormimgs } from "../../../hooks";

export const CommunityFormImgs: FC<any> = ({ imgs, setImgs, submited }) => {
  const {onChangeFiles, onDropFiles, onDragOver,resizing, previewimg, onDeleteImg } = useCommunityFormimgs({imgs, setImgs, submited })
  return (
    <>
      <input type="file" id='imgsDragDrop' name='image' accept=".png, .jpg, .jpeg" onChange={onChangeFiles} multiple style={{ display: "none" }} />
      <PostPreImgBox as="label" htmlFor='imgsDragDrop' style={{ width: "100%" }} onDrop={onDropFiles} onDragOver={onDragOver} >
        <FigureObjectFitImg width='3.75vw' height='3.75vw' src={plus} alt='plus' />
      </PostPreImgBox>
      {resizing ? <div>리사이징 중...</div>
        : <GridBox $gtc='repeat(3, 1fr)' $cgap={10} $rgap={10}>
          {previewimg.length > 0 && previewimg.map((imgs: string, idx: number) => (
            <PostPreImgBox key={imgs} onClick={onDeleteImg(idx)}>
              <FigureObjectFitImg width='100%' height='100%' src={imgs} alt='plus' />
            </PostPreImgBox>
          ))}
        </GridBox>}
    </>
  )
}
