import { FC } from "react";
import * as SC from "../css";
import { useCommentTextArea } from "../../hooks";

export const CommentTextArea: FC = () => {
	const { comment, onChangeComment, onBlurComment } = useCommentTextArea();

	return (
		<>
			<SC.TextaAreaLayout>
				<SC.TextArea maxLength={300} value={comment} onChange={onChangeComment} onBlur={onBlurComment} />{" "}
				{/* onKeyPress={onKeyPress} */}
				<SC.TextaAreaCount $size={comment.length} children={`${comment.length}/300`} />
			</SC.TextaAreaLayout>
		</>
	);
};
