import { FC, useRef, useEffect, ReactNode, useCallback } from "react";
import { styled } from "styled-components";
import { Flex } from "../css";
import { Styled } from "../../types";
import { close } from "../../assets";

interface ModalProps {
  state?: boolean;
  children: ReactNode | any;
  setState?: (state: boolean) => void;
}

export const Modal: FC<ModalProps> = ({ children, state, setState }) => {
  // dialog 참조 ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  // modal 오픈 함수
  const showModal = () => {
    dialogRef.current?.showModal(); // 모달창 노출. show() 호출하면 다이얼로그 노출
  };

  // Modal 닫기 함수
  const closeModal = useCallback(() => {
    dialogRef.current?.close(); // 모달창 닫기
    !!setState && setState(false);
  }, [setState]);

  useEffect(() => {
    if (state) {
      showModal();
    } else {
      closeModal();
    }
  }, [state, closeModal]);

  return (
    <div>
      <dialog ref={dialogRef}>
        <CloseBtnLayout $jc={"flex-end"}>
          <div onClick={closeModal} style={{ cursor: "pointer" }}>
            <img src={close} alt="close" />
          </div>
        </CloseBtnLayout>

        <div>
          {/* 컨텐츠 영역 */}
          {children}
        </div>
      </dialog>
    </div>
  );
};

const CloseBtnLayout = styled.div<Partial<Styled>>`
  ${Flex}
  height: 30px;
`;
