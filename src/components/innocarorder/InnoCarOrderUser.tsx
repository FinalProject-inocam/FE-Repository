import { FC } from "react";
import * as RTK from "../../redux";
import { UserInput } from "./UserInput";
import {
  SignupLabel,
  UserAddress,
  UserRadioInput,
  UserThreeInput,
} from "../css";
import { styled } from "styled-components";
import { UserCheckInput } from "./UserCheckInput";

export const InnoCarOrderUser: FC<any> = ({
  inputRef1,
  inputRef2,
  inputRef3,
  inputRef4,
  inputRef5,
}) => {
  const {
    isLoading: UserIsLoading,
    isError: UserIsError,
    data: UserData,
  } = RTK.useGetMyPageQuery({});
  if (UserIsLoading) <div> 로딩중 </div>;
  else if (UserIsError) <div> 에러 </div>;
  else {
  }

  return (
    <OrderUserLayout>
      <div>
        <SignupLabel>이름</SignupLabel>
        <UserInput
          name={"name"}
          type={"text"}
          placeholder={"홍길동"}
          value={UserData?.nickname}
          // submitted={submitted}
          inputRef={inputRef1}
        />
      </div>

      <div>
        <SignupLabel>출생년도</SignupLabel>
        <UserInput
          name={"birthYear"}
          type={"number"}
          placeholder={"2007년생 이상부터 신청가능합니다"}
          value={UserData?.birthYear}
          // submitted={submitted}
          inputRef={inputRef2}
        />
      </div>

      <div>
        <SignupLabel>전화번호</SignupLabel>
        <UserThreeInput value={UserData?.phonNumber} inputRef={inputRef3} />
      </div>

      <div>
        <SignupLabel>성별</SignupLabel>
        <UserRadioInput
          name={"gender"}
          id1={"genderM"}
          id2={"genderF"}
          value={UserData?.gender}
          value1={"MALE"}
          value2={"FEMALE"}
          children1={"남성"}
          children2={"여성"}
        />
      </div>

      <div>
        <SignupLabel>주소</SignupLabel>
        <UserAddress inputRef1={inputRef4} inputRef2={inputRef5} />
      </div>

      <div>
        <SignupLabel>사용용도</SignupLabel>
        <UserRadioInput
          name={"usage"}
          id1={"usageP"}
          id2={"usageC"}
          value={null}
          value1={"PERSONAL"}
          value2={"COMPANY"}
          children1={"개인"}
          children2={"회사"}
        />
      </div>

      <UserCheckInput />
    </OrderUserLayout>
  );
};

const OrderUserLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;
