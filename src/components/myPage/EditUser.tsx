import React, { useEffect } from "react";
import * as Type from "../../types";
import { useEditUser, useRouter } from "../../hooks";

export const EditUser: React.FC<Type.MyPageData> = ({
  profileImg,
  nickname,
  phoneNumber,
}) => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    edit,
    userInfo,
    onToggleEdit,
    onSubmitPatchUserInfo,
    onChangeFile,
    onChangeUserInfo,
  } = useEditUser({ profileImg, nickname, phoneNumber });

  const { onNavigate } = useRouter();

  useEffect(() => {
    isLoading && <div>로딩중</div>;
    isSuccess && onNavigate({ url: "/" })();
    isError && console.log("isError", error);
  }, [isLoading, isSuccess, isError, error, onNavigate]);

  return (
    <div>
      {!edit ? (
        <>
          <div>
            {profileImg && <img src={profileImg} alt="UserImg" />}
            <br />
            {nickname}
            <br />
            {phoneNumber}
          </div>
          <button onClick={onToggleEdit}> 수정하기 </button>
        </>
      ) : (
        <form onSubmit={onSubmitPatchUserInfo}>
          <input
            type="file"
            name="image"
            onChange={onChangeFile}
            accept=".png, .jpg, .jpeg"
          />
          <br />
          <input
            value={userInfo.nickname}
            name="nickname"
            onChange={onChangeUserInfo}
            type="string"
            placeholder="nickname"
          />
          <br />
          <input
            value={userInfo.phoneNumber}
            name="phoneNumber"
            onChange={onChangeUserInfo}
            type="string"
            placeholder="phoneNumber"
          />
          <br />
          <input
            value={userInfo.password}
            name="password"
            onChange={onChangeUserInfo}
            type="string"
            placeholder="password"
          />
          <br />
          <input
            value={userInfo.newPassword}
            name="newPassword"
            onChange={onChangeUserInfo}
            type="string"
            placeholder="newPassword"
          />
          <br />
          <input
            value={userInfo.newPWChecked}
            name="newPWChecked"
            onChange={onChangeUserInfo}
            type="string"
            placeholder="newPWChecked"
          />
          <input type="submit" value="제출하기" />
          <div onClick={onToggleEdit}>수정취소</div>
        </form>
      )}
    </div>
  );
};
