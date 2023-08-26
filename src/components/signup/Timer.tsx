import { useCheckEmailCodeTimer } from "../../hooks";
import * as RTK from "../../redux";
import * as SC from "../css";

export const Timer: React.FC<{ state: boolean }> = ({ state }) => {
  const { time, sec, min } = useCheckEmailCodeTimer(state);
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeECMsg);

  return (
    <>
      {state && time > 0 ? (
        <SC.ValidateInputMsg
          $signColor={getValidateMsg[1]}
          children={getValidateMsg[0]}
        />
      ) : time > 0 ? (
        <>
          {min} : {sec}
        </>
      ) : (
        <>0 : 00</>
      )}
    </>
  );
};
