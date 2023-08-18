import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as Type from "../../types";
import { usePostCommunityMutation } from "../../redux";
import imageCompression from "browser-image-compression";

export const useCommunityWrite = (): Type.UseCommunityWirte => {
	// (1) 게시글과 관련된 상태
	const [fileInfo, setFileInfo] = useState<File | null>(null);
	const [postInfo, setPostInfo] = useState<Type.Community>({
		title: "",
		content: "",
	});
	// (2) RTK - 게시글 작성에 대한 비동기 함수 관련 Mutation Hooks
	const [onPostPost, { isSuccess, data, isError, error }] = usePostCommunityMutation();

	// (3) INPUTChange - value
	const onChangePost = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setPostInfo({ ...postInfo, [name]: value });
	};

	// (4) INPUTChange - File
	const onChageFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files) {
			const file = e.target.files[0];
			const compressImg = await onActionImgResize(file);
			if (compressImg instanceof File) {
				setFileInfo(compressImg);
			}
		}
	};

	// (5) 이미지 리사이징에 대한 라이브러리
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

	// (6) 게시글 작성을 위한 FormEvent
	const onSubmitPostPosts = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify(postInfo)], { type: "application/json" }));
		if (fileInfo) {
			formData.append("images", fileInfo);
		}
		onPostPost(formData);
		setFileInfo(null);
		setPostInfo({
			title: "",
			content: "",
		});
	};

	useEffect(() => {
		isSuccess && console.log("isSuccess", data);
		isError && console.log("isError", error);
	}, [isSuccess, data, isError, error]);

	return { onChangePost, onChageFile, onSubmitPostPosts, postInfo };
};
