import { useCheckEmailCodeTimer } from "../../hooks";

export const Timer: React.FC<{ state: boolean }> = ({ state }) => {
  const { time, sec, min } = useCheckEmailCodeTimer(state);
  return (
    <div>
      {state
        ? "이메일 인증이 완료되었습니다."
        : time > 0
        ? `${min} : ${sec}`
        : "이메일을 재발송하세요"}
    </div>
  );
};
