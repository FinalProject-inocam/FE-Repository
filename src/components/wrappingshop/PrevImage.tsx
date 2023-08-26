import { FC } from "react"; //ChangeEvent
import * as SC from "../css";
import * as CP from "..";
import { usePrevImage } from "../../hooks";

export const PrevImage: FC<any> = ({ previewImg, setPreviewImg, setState, compressed, setCompressed }) => {
	const onChangeFile = usePrevImage({ setPreviewImg, setState, setCompressed });

	return (
		<SC.FlexBox $jc='flex-start' $ai='center' $gap={10}>
			{previewImg.length < 1 ? null : !compressed ? (
				<SC.CustomBtn $borderR='5px' $bColor='#828295' $color='#828295' children='이미지 등록 중...' />
			) : (
				previewImg.map((img: any, idx: number) => (
					<CP.FigureObjectFitImg key={idx} src={img} width={"6vw"} height={"6vw"} alt='previewImg' />
				))
			)}
			<input
				id='fileupload'
				type='file'
				accept='.png, .jpg, .jpeg'
				onChange={onChangeFile}
				multiple
				style={{ display: "none" }}
			/>
			{(!!previewImg.length === false || (!!previewImg.length && compressed)) && (
				<SC.CustomBtn
					as='label'
					htmlFor='fileupload'
					$borderR='5px'
					$bColor='#828295'
					$color='#828295'
					children='사진업로드+'
				/>
			)}
		</SC.FlexBox>
	);
};
