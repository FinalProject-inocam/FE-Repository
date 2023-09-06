import { FC, useState, ChangeEvent, useEffect } from "react";
import * as SC from "../css";
import * as RTK from "../../redux";

export const UserInput: FC<any> = ({
  name,
  type,
  placeholder,
  inputRef,
  // submitted,
  value,
}) => {
  const [input, setInput] = useState<string>(value ? value : "");
  const [checked, setChecked] = useState<boolean>(true);

  const dispatch = RTK.useAppDispatch();

  useEffect(() => {
    setInput(value ? value : "");
  }, [value]);

  useEffect(() => {
    !!input === true &&
      dispatch(RTK.setInnocarOrderData({ [`${name}`]: input }));
  }, [dispatch, input, name]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    name === "birthYear" && setChecked(true);
    setInput(e.target.value);
  };

  const now = new Date();
  const year = now.getFullYear();

  const onBlurOrderUserDispatch = () => {
    if (year - Number(input) >= 16 || name === "name") {
      dispatch(RTK.setInnocarOrderData({ [`${name}`]: input }));
    } else {
      setChecked(false);
      dispatch(RTK.setInnocarOrderData({ [`${name}`]: null }));
    }
  };

  return (
    <>
      <SC.AuthInput
        type={type}
        value={input}
        onBlur={onBlurOrderUserDispatch}
        onChange={onChangeInput}
        placeholder={placeholder}
        ref={inputRef}
        $width={"100%"}
        $state={name === "name" ? true : checked}
      />
    </>
  );
};
