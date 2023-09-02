import { css, styled } from "styled-components";
import * as Type from "../../types";
import React, { useState } from "react";

const ButtonType: React.FC<Type.WrappingDetailStyled> = ({ onClick, children, ...restProps }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (restProps.type !== "submit") {
			e.preventDefault();
		}
		setClicked(!clicked);
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<StyledButton {...restProps} onClick={handleClick}>
			<>{children}</>
		</StyledButton>
	);
};

const PositiveButton: React.FC<Type.WrappingDetailStyled> = (props) => {
	return <ButtonType {...props} $bgColor='#f2f2ff' $bColor='#4c4cff' $color='#4c4cff' />;
};

const NegativeButton: React.FC<Type.WrappingDetailStyled> = (props: Type.WrappingDetailStyled) => {
	return <ButtonType {...props} $bgColor='#ffffff' $bColor='#828295' $color='#828295' />;
};

const SubmitButton: React.FC<Type.WrappingDetailStyled> = (props) => {
	return <ButtonType {...props} $bgColor='#4c4cff' $color='#ffffff' />;
};

const UploadButton: React.FC<Type.WrappingDetailStyled> = (props) => {
	return <ButtonType {...props} $bgColor='#ffffff' $bColor='#828295' $color='#828295' />;
};

const LikeButton: React.FC<Type.WrappingDetailStyled> = (props) => {
	return <ButtonType {...props} $bgColor='#ffffff' $bColor='#4c4cff' $color='#828295' />;
};

const CommentButton: React.FC<Type.WrappingDetailStyled> = (props) => {
	return <ButtonType {...props} $bgColor='#7C7CFC' $bColor='#828295' $color='#828295' />;
};

const LoginButton: React.FC<Type.WrappingDetailStyled> = (props) => {
	return <ButtonType {...props} $bgColor='#828295' $color='#ffffff' />;
};

export const DetailButton = {
	PositiveButton,
	NegativeButton,
	SubmitButton,
	UploadButton,
	LikeButton,
	CommentButton,
	LoginButton,
};

const StyledButton = styled.button<Partial<Type.Styled>>`
	font-size: 16px;
	display: flex;
	justify-content: center;
	border: none;
	cursor: pointer;
	align-items: center;
	text-align: center;
	border-radius: 5px;
	background-color: ${({ $bgColor }) => $bgColor};
	border: 1px solid ${({ $bColor }) => $bColor};
	color: ${({ $color }) => $color};
	font-weight: normal;
	padding: 0;
	margin: 0;

	&:hover {
		font-weight: bold;
		border: 2px solid ${({ $bColor }) => $bColor};
	}

	${(props) =>
		props.$clicked &&
		css`
			font-weight: bold;
			border: 2px solid ${props.$bColor};
		`}

	${({ $buttonSize }) => {
		switch ($buttonSize) {
			case "revisit":
				return css`
					height: 36px;
					width: 110px;
					line-height: 36px;
				`;
			case "submit":
				return css`
					height: 36px;
					width: 118px;
				`;
			case "upload":
				return css`
					height: 36px;
					width: 118px;
				`;
			case "never":
				return css`
					height: 36px;
					width: 105px;
				`;
			case "like":
				return css`
					height: 36px;
					width: 99px;
				`;
			case "comment":
				return css`
					height: 36px;
					width: 82px;
				`;
			case "login":
				return css`
					height: 36px;
					width: 101px;
				`;
			default:
				return css`
					height: 40px;
					width: 100px;
				`;
		}
	}};
`;
