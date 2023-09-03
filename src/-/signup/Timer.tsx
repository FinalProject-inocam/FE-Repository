import { useCheckEmailCodeTimer } from "../../hooks";
import * as SC from "../css";

export const Timer: React.FC<{ state: boolean; reTimer: boolean }> = ({
  state,
  reTimer,
}) => {
  const { time, sec, min, getValidateMsg } = useCheckEmailCodeTimer(
    state,
    reTimer
  );

  return (
    <>
      {state && time > 0 ? (
        <SC.ValidateInputMsg
          $signColor={getValidateMsg[1]}
          children={getValidateMsg[0]}
        />
      ) : time > 0 ? (
        <div style={{ color: "red" }}>
          {min} : {sec}
        </div>
      ) : (
        <div style={{ color: "red" }}>0 : 00</div>
      )}
    </>
  );
};
