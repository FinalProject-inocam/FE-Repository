import { useState, useEffect, ChangeEvent } from "react";
import * as RTK from "../../redux";

export const useSignupInput = ({ name, submitted }: any): any => {
  const dispatch = RTK.useAppDispatch();
  const [input, setInput] = useState<string>("");
  const [serverCheck, setServerCheck] = useState<boolean>(true);
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fn02 : validiteMsg - input에 따른 validiteMsg 체크
  const onValiditeMsg = (input: string): void => {
    if (name === "email") {
      input === ""
        ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }))
        : !emailRegex.test(input)
        ? dispatch(
            RTK.setValiditeMsg({
              type: name,
              msg: ["이메일을 입력해주세요(exam@.exam.com)", false],
            })
          )
        : dispatch(
            RTK.setValiditeMsg({
              type: name,
              msg: ["이메일 형식에 부합합니다.", false],
            })
          );
    } else if (name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#?$%^&*]).{8,15}$/;
      console.log(passwordRegex);
      // input === ""
      //   ? (validiteMsg = ["", false])
      //   : input.length < 8
      //   ? (validiteMsg = ["8자 이상 입력해 주세요.", false])
      //   : passwordRegex.test(input)
      //   ? (validiteMsg = [
      //       "보안등급: 높음 보안등급이 높을 수록 서비스를 안전하게 이용할 수 있습니다.",
      //       true,
      //     ])
      //   : (validiteMsg = [
      //       "알파벳 대문자,알파벳 소문자, 숫자, 특수문자(?, !, * 등)를 조합하여 입력해 주세요.",
      //       false,
      //     ]);
    } else if (name === "pwChecked") {
      // useAppSelector => password 가져와야 됩니다.
    }
  };

  // Fn01 : onChangeInput - input의 상태 변경 및, 유효성 검사(Msg)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setServerCheck(true);
    onValiditeMsg(e.target.value);
    setInput(e.target.value);
  };

  // Fn03 : onBlurSignupDispatch - input의 입력이 종료되면, 전역상태관리 세팅 및, 서버유효성 검사 실시
  const onBlurSignupDispatch = () => {
    if (name !== "pwChecked") {
      dispatch(RTK.setSignupDate({ [`${name}`]: input }));
    }
    name === "email" && emailRegex.test(input) && setServerCheck(false);
  };

  const {
    isSuccess: isSuccessEmailCheck,
    data: dataEmailCheck,
    isError: isErrorEmailCheck,
    error: errorEmailCheck,
  } = RTK.useGetEmailCheckQuery(input, {
    skip: serverCheck,
  });

  // console.log(getEmailCheck);

  // Fn04 : onClickSeePassword - input.type.password | input.type.text toggle Switch
  const onClickSeePassword = () => {
    setSeePassword((pre) => !pre);
  };

  // Fn05 : useEffect 사이드 이펙트, 부모컴포넌트의 상태 변경에 따른, input 초기화를 위한 리렌더링 발생(props)
  useEffect(() => {
    setInput("");
  }, [submitted]);

  useEffect(() => {
    isSuccessEmailCheck &&
      dispatch(
        RTK.setValiditeMsg({
          type: "email",
          msg: [dataEmailCheck, dataEmailCheck.includes("사용") ? true : false],
        })
      );
    isErrorEmailCheck && console.log(errorEmailCheck);
  }, [
    isSuccessEmailCheck,
    dataEmailCheck,
    isErrorEmailCheck,
    errorEmailCheck,
    dispatch,
  ]);

  return {
    input,
    onValiditeMsg,
    seePassword,
    onChangeInput,
    onBlurSignupDispatch,
    onClickSeePassword,
  };
};

// import { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import * as Type from "../../types";
// import * as RTK from "../../redux";
// import { useRouter } from "../useRouter";

// export const useSignup = (setvalidateCheckCode: Type.SetState): Type.UseSignup => {
// 	const { onNavigate } = useRouter();
// 	const [signInfo, setSignInfo] = useState<Type.UserInfoCheckPW>({
// 		email: "",
// 		password: "",
// 		pwChecked: "",
// 		nickname: "",
// 		phoneNumber: "",
// 		gender: "male",
// 		birthdate: "2023-08-04",
// 		isAdmin: false,
// 		admincode: "E002",
// 	});

// 	const [validiteMsg, setValiditeMse] = useState<Type.ValiditeMsg>({
// 		validteEmail: ["", false],
// 		validtepassword: ["", false],
// 		passwordChMsg: ["", false],
// 	});

// 	const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
// 		const { name, value } = e.target;
// 		setSignInfo({ ...signInfo, [name]: value });
// 		if (name === "email") {
// 			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 			emailRegex.test(value)
// 				? setValiditeMse({
// 						...validiteMsg,
// 						validteEmail: ["사용 가능한 이메일입니다.", true],
// 				  })
// 				: setValiditeMse({
// 						...validiteMsg,
// 						validteEmail: ["이메일을 입력해주세요(exam@.exam.com)", false],
// 				  });
// 		}

// 		if (name === "password") {
// 			const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#?$%^&*]).{8,15}$/;
// 			value.length < 8
// 				? setValiditeMse({
// 						...validiteMsg,
// 						validtepassword: ["8자 이상 입력해 주세요.", false],
// 				  })
// 				: passwordRegex.test(value)
// 				? setValiditeMse({
// 						...validiteMsg,
// 						validtepassword: [
// 							"보안등급: 높음 보안등급이 높을 수록 서비스를 안전하게 이용할 수 있습니다.",
// 							true,
// 						],
// 				  })
// 				: setValiditeMse({
// 						...validiteMsg,
// 						validtepassword: [
// 							"알파벳 대문자,알파벳 소문자, 숫자, 특수문자(?, !, * 등)를 조합하여 입력해 주세요.",
// 							false,
// 						],
// 				  });
// 		}

// 		if (name === "pwChecked") {
// 			!validiteMsg.validtepassword[1]
// 				? setValiditeMse({ ...validiteMsg, passwordChMsg: ["", false] })
// 				: validiteMsg.validtepassword[1] && signInfo.password === value
// 				? setValiditeMse({
// 						...validiteMsg,
// 						passwordChMsg: ["비밀번호가 일치합니다.", true],
// 				  })
// 				: setValiditeMse({
// 						...validiteMsg,
// 						passwordChMsg: ["입력하신 비밀번호가 서로 다릅니다.", false],
// 				  });
// 		}

// 		setCheckEmail(true);
// 		setCheckNickName(true);
// 		setCertificateEmail(true);
// 		setCertificateCode(true);
// 	};

// 	const [checkCode, setCheckCode] = useState<string>("");

// 	const onChangeCheckCode = (e: ChangeEvent<HTMLInputElement>): void => {
// 		setCheckCode(e.target.value);
// 		setCertificateCode(true);
// 	};

// 	const [onpostSignupRTK, { isSuccess, isError, error }] = RTK.usePostSignupMutation();
// 	const onSubmitSign = (e: FormEvent<HTMLFormElement>): void => {
// 		e.preventDefault();
// 		onpostSignupRTK(signInfo);
// 	};

// 	const [checkEmail, setCheckEmail] = useState(true);
// 	// 101 useGetEmailCheckQuery 와 120 useGetCertificateEmailQuery
// 	const { isSuccess: checkEmailSuccess, data: checkEmailData } = RTK.useGetEmailCheckQuery(signInfo.email, {
// 		skip: checkEmail,
// 	});

// 	const [checkNickName, setCheckNickName] = useState(true);
// 	const { isSuccess: checkNickNameSuccess, data: checkNickNameData } = RTK.useGetNickCheckQuery(signInfo.nickname, {
// 		skip: checkNickName,
// 	});

// 	const onCheckEmail = (): void => {
// 		!!signInfo.email && setCheckEmail(false);
// 	};

// 	const onCheckNickName = (): void => {
// 		!!signInfo.nickname && setCheckNickName(false);
// 	};

// 	const [certificateEmail, setCertificateEmail] = useState(true);
// 	const CertificateEmailRTK = RTK.useGetCertificateEmailQuery(signInfo.email, {
// 		skip: certificateEmail,
// 	});

// 	const onCertificateEmail = (): void => {
// 		!!signInfo.email && setCertificateEmail(false);
// 	};

// 	const [certificateCode, setCertificateCode] = useState(true);
// 	const GetCertificateCodeRTK = RTK.useGetCertificateCodeQuery(
// 		{ email: signInfo.email, code: checkCode },
// 		{
// 			skip: certificateCode,
// 		}
// 	);

// 	const onClickCheckCode = (): void => {
// 		setCertificateCode(false);
// 	};

// 	const [showPW, setShowPw] = useState(false);

// 	const onClickShowPW = (): void => {
// 		setShowPw(!showPW);
// 	};

// 	useEffect(() => {
// 		if (isSuccess) onNavigate("/login")();
// 		if (checkEmailSuccess)
// 			console.log(checkEmailData ? "사용 가능한 이메일 입니다" : "이미 사용 중인 이메일입니다");
// 		if (checkNickNameSuccess)
// 			console.log(checkNickNameData ? "사용 가능한 닉네임 입니다" : "이미 사용 중인 닉네임입니다");
// 		GetCertificateCodeRTK.isSuccess && setvalidateCheckCode(true);
// 		if (isError) {
// 			console.log("회원가입 실패", error);
// 		}
// 		if (CertificateEmailRTK.isSuccess) {
// 			console.log("CertificateEmailRTK", "인증메일이 발송되었습니다.");
// 		}
// 	}, [
// 		GetCertificateCodeRTK.isSuccess,
// 		isSuccess,
// 		checkEmailSuccess,
// 		checkEmailData,
// 		checkNickNameData,
// 		checkNickNameSuccess,
// 		onNavigate,
// 		setvalidateCheckCode,
// 		isError,
// 		error,
// 		CertificateEmailRTK,
// 	]);

// 	return {
// 		signInfo,
// 		certificateEmail,
// 		checkCode,
// 		validiteMsg,
// 		showPW,
// 		onSubmitSign,
// 		onChangeInput,
// 		onCheckEmail,
// 		onCheckNickName,
// 		onCertificateEmail,
// 		onChangeCheckCode,
// 		onClickCheckCode,
// 		onClickShowPW,
// 	};
// };
