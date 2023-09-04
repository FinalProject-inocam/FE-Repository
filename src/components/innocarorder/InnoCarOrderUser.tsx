import { FC, useRef } from "react";
import { useInnoCarOrderUser } from "../../hooks";
import DaumPostcode from "react-daum-postcode";
import * as RTK from "../../redux";
import { UserInput } from "./UserInput";

export const InnoCarOrderUser: FC = () => {
  const {
    carOrderInfo,
    openDaumPost,
    onChangeCarOrderInfo,
    setOpenDaumPost,
    handleComplete,
  } = useInnoCarOrderUser();

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const {
    isLoading: UserIsLoading,
    isError: UserIsError,
    data: UserData,
  } = RTK.useGetMyPageQuery({});
  if (UserIsLoading) <div> 로딩중 </div>;
  else if (UserIsError) <div> 에러 </div>;
  else {
    console.log(UserData);
  }

  return (
    <>
      <UserInput
        name={"name"}
        type={"text"}
        placeholder={"홍길동"}
        value={UserData?.nickname}
        // submitted={submitted}
        inputRef={inputRef1}
      />
      <UserInput
        name={"birthYear"}
        type={"text"}
        placeholder={"1990"}
        value={UserData?.birthYear}
        // submitted={submitted}
        inputRef={inputRef2}
      />
      <input
        type="text"
        name="alarm"
        // value={carOrderInfo.alarm}
        onChange={onChangeCarOrderInfo}
        placeholder="메일링서비스 - true/ false 만 입력"
      />
      <input
        type="text"
        name="content"
        value={carOrderInfo.content}
        onChange={onChangeCarOrderInfo}
        placeholder="요청사항"
      />
      <input
        type="text"
        name="addressName"
        value={carOrderInfo.addressName}
        onChange={onChangeCarOrderInfo}
        placeholder="문의사항"
      />
      <input
        type="text"
        name="zoneNo"
        value={carOrderInfo.zoneNo}
        onChange={onChangeCarOrderInfo}
        placeholder="주소와 우편번호"
      />
      <button
        onClick={() => {
          setOpenDaumPost(true);
        }}
      >
        카카오주소검색
      </button>
      {openDaumPost && <DaumPostcode onComplete={handleComplete} />}
    </>
  );
};

// const onSubmitCarOrder = (e: FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     // console.log(carOrderInfo);
//     // console.log(typeof carOrderInfo.alarm);
//     onPostPurchase(carOrderInfo);
// }

// const [onPostPurchase, query] = usePostPurchasesMutation();

// useEffect(() => {
//     query && console.log(query);
//   }, [query]);

// const [submitted, setSubmitted] = useState<boolean>(true);
// setSubmitted((pre) => !pre); 디스패치 보낼때 이것도 수정
