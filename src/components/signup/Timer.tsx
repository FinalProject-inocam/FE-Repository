import { useEffect } from "react";
import { useCheckEmailCodeTimer } from "../../hooks";
import * as RTK from "../../redux";
import * as SC from "../css";

export const Timer: React.FC<{ state: boolean }> = ({ state }) => {
  const { time, sec, min } = useCheckEmailCodeTimer(state);
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeECMsg);
  const dispatch = RTK.useAppDispatch();

  useEffect(() => {
    if (time <= 0) {
      dispatch(
        RTK.setValiditeMsg({
          type: "emailCheckedMsg",
          msg: ["이매일을 재발송하세요", false],
        })
      );
    }
  }, [time, dispatch]);

  return (
    <>
      {time > 0 && state ? (
        <SC.ValidateInputMsg
          $signColor={getValidateMsg[1]}
          children={getValidateMsg[0]}
        />
      ) : time > 0 && !state ? (
        <>
          {min} : {sec}
        </>
      ) : (
        <SC.ValidateInputMsg
          $signColor={getValidateMsg[1]}
          children={getValidateMsg[0]}
        />
      )}
    </>
  );
};
