import { FC } from "react";
import * as SC from "../css";
import { useRevisitRadio } from "../../hooks";

export const RevisitRadio: FC = () => {
	const { getRevisit, onChangeRevisit } = useRevisitRadio();

	return (
		<SC.FlexBox $gap={10}>
			<input
				type='radio'
				name='review'
				value='true'
				id='reviewOn'
				onChange={onChangeRevisit}
				style={{ display: "none" }}
			/>
			<SC.RevisitRadioLabel htmlFor='reviewOn' $state={getRevisit === 1 ? 1 : 0}>
				재방문 의사
			</SC.RevisitRadioLabel>
			<input
				type='radio'
				name='review'
				value='false'
				id='reviewOff'
				onChange={onChangeRevisit}
				style={{ display: "none" }}
			/>
			<SC.RevisitRadioLabel htmlFor='reviewOff' $state={getRevisit === 2 ? 2 : 0}>
				재방문 없음
			</SC.RevisitRadioLabel>
		</SC.FlexBox>
	);
};
