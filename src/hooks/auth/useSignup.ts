import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import * as Type from "../../types";
import * as RTK from "../../redux";
import { useRouter } from "../useRouter";

export const useSignup = (setvalidateCheckCode: Type.SetState): Type.UseSignup => {
	const { onNavigate } = useRouter();
	const [signInfo, setSignInfo] = useState<Type.UserInfoCheckPW>({
		email: "",
		password: "",
		pwChecked: "",
		nickname: "",
		phoneNumber: "",
		gender: "male",
		birthdate: "2023-08-04",
		isAdmin: false,
		admincode: "E002",
	});

	const [validiteMsg, setValiditeMse] = useState<Type.ValiditeMsg>({
		validteEmail: ["", false],
		validtepassword: ["", false],
		passwordChMsg: ["", false],
	});

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setSignInfo({ ...signInfo, [name]: value });
		if (name === "email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			emailRegex.test(value)
				? setValiditeMse({
						...validiteMsg,
						validteEmail: ["사용 가능한 이메일입니다.", true],
				  })
				: setValiditeMse({
						...validiteMsg,
						validteEmail: ["이메일을 입력해주세요(exam@.exam.com)", false],
				  });
		}

		if (name === "password") {
			const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#?$%^&*]).{8,15}$/;
			value.length < 8
				? setValiditeMse({
						...validiteMsg,
						validtepassword: ["8자 이상 입력해 주세요.", false],
				  })
				: passwordRegex.test(value)
				? setValiditeMse({
						...validiteMsg,
						validtepassword: [
							"보안등급: 높음 보안등급이 높을 수록 서비스를 안전하게 이용할 수 있습니다.",
							true,
						],
				  })
				: setValiditeMse({
						...validiteMsg,
						validtepassword: [
							"알파벳 대문자,알파벳 소문자, 숫자, 특수문자(?, !, * 등)를 조합하여 입력해 주세요.",
							false,
						],
				  });
		}

		if (name === "pwChecked") {
			!validiteMsg.validtepassword[1]
				? setValiditeMse({ ...validiteMsg, passwordChMsg: ["", false] })
				: validiteMsg.validtepassword[1] && signInfo.password === value
				? setValiditeMse({
						...validiteMsg,
						passwordChMsg: ["비밀번호가 일치합니다.", true],
				  })
				: setValiditeMse({
						...validiteMsg,
						passwordChMsg: ["입력하신 비밀번호가 서로 다릅니다.", false],
				  });
		}

		setCheckEmail(true);
		setCheckNickName(true);
		setCertificateEmail(true);
		setCertificateCode(true);
	};

	const [checkCode, setCheckCode] = useState<string>("");

	const onChangeCheckCode = (e: ChangeEvent<HTMLInputElement>): void => {
		setCheckCode(e.target.value);
		setCertificateCode(true);
	};

	const [onpostSignupRTK, { isSuccess, isError, error }] = RTK.usePostSignupMutation();
	const onSubmitSign = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		onpostSignupRTK(signInfo);
	};

	const [checkEmail, setCheckEmail] = useState(true);
	// 101 useGetEmailCheckQuery 와 120 useGetCertificateEmailQuery
	const { isSuccess: checkEmailSuccess, data: checkEmailData } = RTK.useGetEmailCheckQuery(signInfo.email, {
		skip: checkEmail,
	});

	const [checkNickName, setCheckNickName] = useState(true);
	const { isSuccess: checkNickNameSuccess, data: checkNickNameData } = RTK.useGetNickCheckQuery(signInfo.nickname, {
		skip: checkNickName,
	});

	const onCheckEmail = (): void => {
		!!signInfo.email && setCheckEmail(false);
	};

	const onCheckNickName = (): void => {
		!!signInfo.nickname && setCheckNickName(false);
	};

	const [certificateEmail, setCertificateEmail] = useState(true);
	const CertificateEmailRTK = RTK.useGetCertificateEmailQuery(signInfo.email, {
		skip: certificateEmail,
	});

	const onCertificateEmail = (): void => {
		!!signInfo.email && setCertificateEmail(false);
	};

	const [certificateCode, setCertificateCode] = useState(true);
	const GetCertificateCodeRTK = RTK.useGetCertificateCodeQuery(
		{ email: signInfo.email, code: checkCode },
		{
			skip: certificateCode,
		}
	);

	const onClickCheckCode = (): void => {
		setCertificateCode(false);
	};

	const [showPW, setShowPw] = useState(false);

	const onClickShowPW = (): void => {
		setShowPw(!showPW);
	};

	useEffect(() => {
		if (isSuccess) onNavigate("/login")();
		if (checkEmailSuccess)
			console.log(checkEmailData ? "사용 가능한 이메일 입니다" : "이미 사용 중인 이메일입니다");
		if (checkNickNameSuccess)
			console.log(checkNickNameData ? "사용 가능한 닉네임 입니다" : "이미 사용 중인 닉네임입니다");
		GetCertificateCodeRTK.isSuccess && setvalidateCheckCode(true);
		if (isError) {
			console.log("회원가입 실패", error);
		}
		if (CertificateEmailRTK.isSuccess) {
			console.log("CertificateEmailRTK", "인증메일이 발송되었습니다.");
		}
	}, [
		GetCertificateCodeRTK.isSuccess,
		isSuccess,
		checkEmailSuccess,
		checkEmailData,
		checkNickNameData,
		checkNickNameSuccess,
		onNavigate,
		setvalidateCheckCode,
		isError,
		error,
		CertificateEmailRTK,
	]);

	return {
		signInfo,
		certificateEmail,
		checkCode,
		validiteMsg,
		showPW,
		onSubmitSign,
		onChangeInput,
		onCheckEmail,
		onCheckNickName,
		onCertificateEmail,
		onChangeCheckCode,
		onClickCheckCode,
		onClickShowPW,
	};
};
