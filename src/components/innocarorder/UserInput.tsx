import { FC } from "react";
import * as SC from "../css";
import { useUserInput } from "../../hooks";

export const UserInput: FC<any> = ({
  name,
  type,
  placeholder,
  inputRef,
  // submitted,
  value,
  // validiteMsg,
  // setValiditeMsg,
}) => {
  const { input, onBlurOrderUserDispatch, onChangeInput } = useUserInput({
    name,
    // submitted,
    value,
    // setValiditeMsg,
  });

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
        $state={true}
        // $state={validiteMsg[1]}
      />
    </>
  );
};

{
  /* <SC.ValidateInputMsg
$signColor={validiteMsg[1]}
children={validiteMsg[0]}
/> */
}
