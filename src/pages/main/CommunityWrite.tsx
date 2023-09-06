import React from "react";
import * as Hooks from "../../hooks";
import * as SC from "../../components";

export const CommunityWrite: React.FC = () => {
	const {
		onNavigate,
		onSubmitReview,
		onPostTagToggle,
		postTag,
		postTagToggle,
		onSetPostTag,
		imgs,
		setImgs,
		submited,
	} = Hooks.useCommunityWrite();

	return (
		<SC.FlexBox $fd='column' $ai='start' $jc='start' $gap={30}>
			<SC.SettingBtn onClick={onNavigate({ url: "/community/1" })}>
				<SC.CustomP $height='47px' $bColor='white' $size={1.125}>
					목록으로
				</SC.CustomP>
			</SC.SettingBtn>

			<SC.FlexBox as='form' $fd='column' $gap={20} style={{ width: "100%" }} onSubmit={onSubmitReview}>
				<SC.GridBox $gtc='144px 1fr' $cgap={20}>
					<div style={{ position: "relative" }}>
						<SC.PostWriteTag onClick={onPostTagToggle}>
							{postTag}
							<SC.CustomP $height='70px' $size={1.5} style={{ marginLeft: "20px" }}>
								▼
							</SC.CustomP>
						</SC.PostWriteTag>
						{postTagToggle && (
							<SC.PostTagSelector $fd='column' $gap={5} $size={50 * 2}>
								{["후기", "자유"].map((tag) => (
									<SC.CustomP
										key={tag}
										style={{ width: "100%" }}
										$height='50px'
										data-value={tag}
										onClick={onSetPostTag}
										children={tag}
									/>
								))}
							</SC.PostTagSelector>
						)}
					</div>
					<SC.CommunityFormTitle submited={submited} />
				</SC.GridBox>
				<SC.PostList $jc='flex-start' $gap={20}>
					<SC.CommunityFormTextArea submited={submited} />
					<SC.CommunityFormImgs imgs={imgs} setImgs={setImgs} submited={submited} />
				</SC.PostList>
				<SC.CommuityWriteInput type='submit' value='작성' />
			</SC.FlexBox>
		</SC.FlexBox>
	);
};
