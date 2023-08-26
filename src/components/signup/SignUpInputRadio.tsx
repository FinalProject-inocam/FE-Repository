import React, { useEffect, useState, ChangeEvent } from "react";
import * as RTK from "../../redux";
import * as SC from "../css";
import * as Type from "../../types";

export const SignUpInputRadio: React.FC<Type.SignUpInputRadio> = ({ inputRef, submitted }) => {
	const [input, setInput] = useState<string>("");
	const dispatch = RTK.useAppDispatch();
	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};
	useEffect(() => {
		!!input === true && dispatch(RTK.setSignupDate({ gender: input }));
	}, [dispatch, input]);

	useEffect(() => {
		setInput("");
	}, [submitted]);

  return (
    <SC.AuthInputsLayout>
      <input
        type="radio"
        id="genderM"
        ref={inputRef}
        name="gender"
        value="male"
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <SC.SignupSexLabel
        htmlFor="genderM"
        children="남성"
        $state={input === "male"}
      />
      <input
        type="radio"
        id="genderF"
        ref={inputRef}
        name="gender"
        value="female"
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <SC.SignupSexLabel
        htmlFor="genderF"
        children="여성"
        $state={input === "female"}
      />
    </SC.AuthInputsLayout>
  );
};
