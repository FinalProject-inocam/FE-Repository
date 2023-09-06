import { FC, useState, ChangeEvent, useEffect } from "react";
import * as RTK from "../../redux";
import * as SC from "../css";

export const UserThreeInput: FC<any> = ({ value, inputRef }) => {
  const dispatch = RTK.useAppDispatch();

  useEffect(() => {
    !!value === true &&
      dispatch(RTK.setInnocarOrderData({ [`phoneNumber`]: value }));
  }, [dispatch, value]);

  // 나중에 userInput일아 합치기
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");

  useEffect(() => {
    if (value) {
      const num1 = value.substr(0, 3);
      const num2 = value.substr(3, 4);
      const num3 = value.substr(7, 4);
      setInput1(num1);
      setInput2(num2);
      setInput3(num3);
    }
  }, [value]);

  const onBlurOrderUserDispatch = () => {
    dispatch(
      RTK.setInnocarOrderData({ [`phoneNumber`]: input1 + input2 + input3 })
    );
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };

  const onChangeInputTwo = (e: ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };

  const onChangeInputThree = (e: ChangeEvent<HTMLInputElement>) => {
    setInput3(e.target.value);
  };

  return (
    <SC.FlexBox $gap={10}>
      <SC.AuthInput
        type="number"
        value={input1}
        onBlur={onBlurOrderUserDispatch}
        onChange={onChangeInput}
        placeholder={"010"}
        ref={inputRef}
        $width={"100%"}
        $state={true}
      />
      <SC.AuthInput
        type="number"
        value={input2}
        onBlur={onBlurOrderUserDispatch}
        onChange={onChangeInputTwo}
        placeholder={"1111"}
        ref={inputRef}
        $width={"100%"}
        $state={true}
      />
      <SC.AuthInput
        type="number"
        value={input3}
        onBlur={onBlurOrderUserDispatch}
        onChange={onChangeInputThree}
        placeholder={"1111"}
        ref={inputRef}
        $width={"100%"}
        $state={true}
      />
    </SC.FlexBox>
  );
};
