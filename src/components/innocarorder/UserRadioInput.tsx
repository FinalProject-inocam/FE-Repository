import { FC, useState, ChangeEvent, useEffect } from "react";
import * as RTK from "../../redux";
import * as SC from "../css";

interface UserRadioInputProps {
  name: string;
  id1: string;
  id2: string;
  value: string | null;
  value1: string;
  value2: string;
  children1: string;
  children2: string;
  inputRef?: any;
}

export const UserRadioInput: FC<UserRadioInputProps> = ({
  name,
  id1,
  id2,
  value,
  value1,
  value2,
  children1,
  children2,
}) => {
  const [input, setInput] = useState<string>(value ? value : "");
  const dispatch = RTK.useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setInput(value ? value : "");
  }, [value]);

  useEffect(() => {
    !!input === true &&
      dispatch(RTK.setInnocarOrderData({ [`${name}`]: input }));
  }, [dispatch, input, name]);

  return (
    <SC.FlexBox $gap={10}>
      <input
        type="radio"
        id={id1}
        name={name}
        value={value1}
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <SC.SignupGenderLabel
        htmlFor={id1}
        children={children1}
        $state={input === value1}
        $width={"100%"}
      />
      <input
        type="radio"
        id={id2}
        name={name}
        value={value2}
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <SC.SignupGenderLabel
        htmlFor={id2}
        children={children2}
        $state={input === value2}
        $width={"100%"}
      />
    </SC.FlexBox>
  );
};
