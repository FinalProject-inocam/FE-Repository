import React, { ChangeEvent, useEffect, useState } from 'react';
import { PostPosts } from '../../types/post';
import imageCompression from "browser-image-compression";
import { usePostPostsMutation } from '../../redux';

export const CommunityWrite: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<File | null>(null);
  const [postInfo, setPostInfo] = useState<PostPosts>({
    title: "",
    content: "",
  })

  const onChangePost = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setPostInfo({ ...postInfo, [name]: value })
  }

  const onActionImgResize = async (files: File):Promise<File | undefined> => {
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

  const onChageFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      const file = e.target.files[0]
      const compressImg = await onActionImgResize(file)
      if (compressImg instanceof File) {
        setFileInfo(compressImg)
      } else {
        console.log('Image compression failed.');
      }
    }
  }

  const [onPostPost, {isSuccess, data, isError, error }] = usePostPostsMutation()
  const onWriteButton = (): void => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(postInfo)], { type: 'application/json' }))
    if (fileInfo) {
      formData.append('images', fileInfo)
    }
    console.log(Array.from(formData.entries()));
    onPostPost(formData)
  }
  

  useEffect(()=> {
    isSuccess && console.log("isSuccess", data);
    isError && console.log("isError", error);
  }, [isSuccess, data, isError, error ])

  return (
    <form>
      <input type="text" value={postInfo.title} name='title' onChange={onChangePost} placeholder='제목을 입력해 주세요' />
      <input type="text" value={postInfo.content} name='content' onChange={onChangePost} placeholder='내용을 입력해 주세요' />
      <input type="file" name='image' accept=".png, .jpg, .jpeg" onChange={onChageFile} />
      <div onClick={onWriteButton}>글쓰기</div>
    </form>
  )
};