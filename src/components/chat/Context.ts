import React, { createContext } from 'react'
import { Socket } from 'socket.io-client'

// (1) useReducer를 위한 타입정의 
export type TSocketContextActions = 'update_socket' | 'update_uid' | 'update_user' | 'remover_users'
export type TSocketCotextPayload = string | string[] | Socket;
export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketCotextPayload
}

// (1) useReducer를 위한 함수
export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
  console.log(`메시지를 받음 - Action ${action.type} - Payload : ${action.payload}`);

  switch (action.type) {
    case 'update_socket':
      return { ...state, socket: action.payload as Socket }
    case 'update_uid':
      return { ...state, uid: action.payload as string }
    case 'update_user':
      return { ...state, user: action.payload as string[] }
    case 'remover_users':
      return { ...state, user: state.users.filter( uid => uid !== (action.payload as string))}
    default:
      return {...state}  
  }
}

// (2) ContextAPI 생성을 위한 타입 
export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

// (2) ContextAPI 의 초기값을 위한 타입
export interface ISocketContextState {
  socket: Socket | undefined
  uid: string;
  users: string[]
}

// (2) ContextAPI 의 초기값 선언
export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  uid: '',
  users: []
  };

// (2) ContextAPI 생성 createContext
const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {}
});

// (2) ContextAPI export 
export const SocketContextConsumer = SocketContext.Consumer; // 컴포넌트에서 쓸 것
export const SocketContextProvider = SocketContext.Provider; // 상위 컴포넌트에서 생성할 ContextAPI
export default SocketContext;


