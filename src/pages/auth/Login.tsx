import React, { useEffect, useState } from "react";
import { useLogin, useRouter } from "../../hooks";
import { kakaoIcon, naverIcon, googleIcon } from "../../assets";
import * as SC from "../../components";
import { styled } from "styled-components";
import { useLayoutRef } from "../../hooks/auth/useLayoutRef";

export const Login: React.FC = () => {
	const { onNavigate, state } = useRouter();
	const {
		isSuccess,
		isError,
		error,
		submitted,
		inputRef1,
		inputRef2,
		validiteMsgE,
		validiteMsgP,
		setValiditeMsgE,
		setValiditeMsgP,
		onSubmitLogin,
		onSnsLogin,
		onSignupClick,
		onSubmitLoginUser,
    onSubmitLoginAdmin,
	} = useLogin(state);

	const [failModal, setFailModal] = useState<boolean>(false)

	useEffect(() => {
		if (isSuccess) {
			onNavigate({
				url: state === null || state === "/Signup" || state === "/Signup/admin" ? "/" : state,
			})();
		}
	}, [isSuccess, state, onNavigate]);

	useEffect(()=>{
		isError && setFailModal(true)
	}, [isError])

	const LayoutRef = useLayoutRef()

	return (
			<SC.FlexBox ref={LayoutRef} style={{paddingTop:"90px"}}>
				{isError && failModal 
					&& <FailModalDiv onClick={() =>setFailModal(false)} children={<>
					<div>{error as string}</div>
					<CloseBTN children="닫기" />
					</>} />}
				<SC.AuthForm onSubmit={onSubmitLogin} $gtc={"repeat(1, 1fr)"} $rgap={20}>
					<SC.FlexBox $gap={12} $fd={"column"}>
						<div>
							<SC.SignupLabel>이메일</SC.SignupLabel>
							<SC.LoginInput
								name={"email"}
								type={"text"}
								placeholder={"example@innocam.com"}
								submitted={submitted}
								inputRef={inputRef1}
								validiteMsg={validiteMsgE}
								setValiditeMsg={setValiditeMsgE}
							/>
						</div>
						<div>
							<SC.SignupLabel>비밀번호</SC.SignupLabel>
							<SC.LoginInput
								name={"password"}
								type={"password"}
								placeholder={"비밀번호를 입력해주세요"}
								submitted={submitted}
								inputRef={inputRef2}
								validiteMsg={validiteMsgP}
								setValiditeMsg={setValiditeMsgP}
							/>
						</div>

						<div>
							<SC.AuthSubmitInput type='submit' value='이메일 로그인' $state={true} />
						</div>
						<SC.LoginSignupButton onClick={onSignupClick}>회원가입하기</SC.LoginSignupButton>
						<SC.FlexBox $gap={20} style={{marginTop:"5px"}}>
						<SC.LoginSignupButton onClick={onSubmitLoginUser}>테스트계정로그인(회원)</SC.LoginSignupButton>
						<SC.LoginSignupButton onClick={onSubmitLoginAdmin}>테스트계정로그인(관리자)</SC.LoginSignupButton>
						</SC.FlexBox>
					</SC.FlexBox>

          <SC.FlexBox $gap={10} $fd={"column"}>
            <SC.LoginSnsButton onClick={onSnsLogin("kakao")} $types={"kakao"}>
              <img src={kakaoIcon} alt="kakaoIcon" />
              카카오로 로그인하기
            </SC.LoginSnsButton>
            <SC.LoginSnsButton onClick={onSnsLogin("naver")} $types={"naver"}>
              <img src={naverIcon} alt="naverIcon" />
              네이버로 로그인하기
            </SC.LoginSnsButton>
            <SC.LoginSnsButton onClick={onSnsLogin("google")} $types={"google"}>
              <img src={googleIcon} alt="googleIcon" />
              구글로 로그인하기
            </SC.LoginSnsButton>
          </SC.FlexBox>
        </SC.AuthForm>
      </SC.FlexBox>
  );
};


const FailModalDiv = styled.div`
	${SC.Flex}
	flex-direction: column;
	gap: 10px;
	position: absolute;
	top: 50;
	left: 50%;
	border-radius: 30px;
	transform: translate(-50%, -50%);
	width: 400px;
	height: 100px;
	padding: 20px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 20px;
`

const CloseBTN = styled.div`
	${SC.Flex}
	${SC.cursor}
	padding: 10px 30px;
	border-radius: 20px;
	border: none;
	color:white;
	background-color: ${({theme})=> theme.color.blue};
`