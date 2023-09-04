import React, { useEffect, useState, ChangeEvent } from "react";
import * as RTK from "../../redux";
import * as SC from "../css";

export const SignUpInputRadio: React.FC = () => {
  const [input, setInput] = useState<string>("MALE");
  const dispatch = RTK.useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    !!input === true && dispatch(RTK.setSignupDate({ gender: input }));
  }, [dispatch, input]);

  return (
    <SC.FlexBox $gap={10}>
      <input
        type="radio"
        id="genderM"
        name="gender"
        value="MALE"
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <SC.SignupGenderLabel
        htmlFor="genderM"
        children="남성"
        $state={input === "MALE"}
      />
      <input
        type="radio"
        id="genderF"
        name="gender"
        value="FEMALE"
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <SC.SignupGenderLabel
        htmlFor="genderF"
        children="여성"
        $state={input === "FEMALE"}
      />
    </SC.FlexBox>
  );
};
