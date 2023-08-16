import { ChangeEvent, useState, FormEvent } from "react";
import imageCompression from "browser-image-compression";
import * as RTK from "../../redux";
import * as Type from "../../types";

export const useEditUser = ({
  imageUrls,
  nickname,
  phoneNumber,
}: Type.MyPageData): Type.UseEditUser => {
  const [userInfo, setUserInfo] = useState<Type.MyPageEditData>({
    imageUrls: imageUrls,
    nickname: nickname,
    phoneNumber: phoneNumber,
    password: "",
    newPassword: "",
    newPWChecked: "",
  });

  const [onPatchMyPageRTK, { isLoading, isSuccess, isError, error }] =
    RTK.usePatchMyPageMutation({});

  const [fileInfo, setFileInfo] = useState<File | null>(null);

  const [edit, setEdit] = useState<boolean>(false);

  const onChangeUserInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onChangeFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files) {
      const file = e.target.files[0];
      const compressImg = await onActionImgResize(file);
      if (compressImg instanceof File) {
        setFileInfo(compressImg);
      }
    }
  };

  const onActionImgResize = async (files: File): Promise<File | undefined> => {
    const options = {
      maxSizeMB: 1, // 1000000b === 1000kb === 1mb //
      maxWidthOrHeight: 3000,
      useWebWorker: true,
    };
    try {
      const compressBlob = await imageCompression(files, options);
      const compressFile = new File([compressBlob], files.name, {
        type: files.type,
      });
      return compressFile;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitPatchUserInfo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(userInfo)], { type: "application/json" })
    );
    if (fileInfo) {
      formData.append("images", fileInfo);
    }
    onPatchMyPageRTK(formData);
    setFileInfo(null);
    setUserInfo({
      imageUrls: "",
      nickname: "",
      phoneNumber: "",
      password: "",
      newPassword: "",
      newPWChecked: "",
    });
  };

  const onToggleEdit = () => {
    setEdit(!edit);
  };

  return {
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
  };
};
