import { ChangeEvent, useState } from "react";
import * as RTK from "../../redux";

export const useUserInput = ({ name, value }: any): any => {
  const [input, setInput] = useState<string>(!!value ? value : "");
  const dispatch = RTK.useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onBlurOrderUserDispatch = () => {
    dispatch(RTK.setInnocarOrderData({ [`${name}`]: input }));
  };

  return { input, onBlurOrderUserDispatch, onChangeInput };
};

// useEffect(() => {
//   setInput("");
// }, [submitted]);
