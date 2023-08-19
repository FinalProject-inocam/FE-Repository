# INNOCAM-Moters

## 리팩토링

<details>
<summary>1차 리팩토링 - 8월 1일</summary>

1. 코드유지보수 및 모듈의 재사용성 개선 : `"리엑트 모듈 인덱스"` 또는 `"바렐(rel) 모듈 인덱스"` 패턴

   <details>
   <summary>코드 살펴보기 </summary>

   ```tsx
   import Button from "./components/community";
   import Modal from "./components/css";
   import Header from "./components/atom";
   ```

   각 컴포넌트를 사용하려면 이렇게 여러줄의 임포트 구문이 필요합니다.

   ```tsx
   export * from "./community";
   export * from "./css";
   export * from "./atom";
   ```

   "components"디렉토리에 "index.ts" 파일을 추가하여 모든 컴포넌트를 내보내면

   ```tsx
   import { community, css, atom } from "../../components";
   ```

   이와 같이 간결하게 컴포넌트들을 임포트 할 수 있습니다.
   </details>

   `"리엑트 모듈 인덱스"` 또는 `"바렐(rel) 모듈 인덱스"` 패턴을 통해 코드 구조정리

   - 모듈관리용이성 : 여러 컴포넌트/파일을 단일 파일로 묶어서 관리
   - 상대경로간소화 : 컴포넌트에서 해당 디렉토리 내의 파일을 가져올 때 단순하게 표현하게 함
   - 이를 통해 상대경로 관리를 쉽게 처리하도록 하여 개발환경 개선을 시도

</details>

<details>
  <summary>2차 리팩토링 - 8월 11-12일</summary>

1. 성능최적화와 코드 스플리팅(React.lazy)

   <details>
   <summary>코드살펴보기</summary>

   ```tsx
   // lazyLoding.ts
   import { lazy } from "react";

   export const LazyInoCar = lazy(() => import("../main/InoCar").then(({ InoCar }) => ({ default: InoCar })));
   export const LazyCommunity = lazy(() => import("../main/Community").then(({ Community }) => ({default: Community})));
   export const LazyThreejs = lazy(() => import("../Threejs").then(({ Threejs }) => ({default: Threejs})));

   // App.tsx - Router
   const App: React.FC = () => {
     return (
       <Routes>
           <Route
             path='inocar'
             element={
               <Suspense fallback={<div>Loading...</div>}>
                 <Page.LazyInoCar />
               </Suspense>
             }
           />
       <Routes>
       )
   }
   ```

   </details>

- 초기 로딩 시점에 당장 필요하지 않지만 무거운 컴포넌트로 인해 로딩이 지연되는 문제를 인식
- 이를 개선하기 위해 해당 컴포넌트들의 로드를 미루어 성능을 최적화하려고 프로젝트 구조를 편성
- React.lazy를 사용하여 대상 컴포넌트들 동적제어, Suspense를 사용하여 로딩화면 제어
- lazy 대상 컴포넌트 : InoCar, Community, Threejs <br/><br/>

2. 타입선언 관련 코드컨벤션(Interface, declare)

- hooks.d.ts : 커스컴훅과 관련된 타입선언이 기록되고 이름은 훅이름으로 설정, 사용하는 컴포넌트에서는 알리아스(as)를 통하여 Type임을 명시해준다.
- 타입선언과 Interface, declare

  - `Interface` : 객체나 클래스 단위의 형태에 대한 명시적인 정의 타입 생성, extends를 통해서 앞선 Interface를 상속받아 프로토타입 체인을 형성한다.
  - `declare` : 외부 라이브러리나 모듈의 타입을 확장하거나 정의할 때 사용되며, 외부 라이브러리의 타입 정보가 없을 경우 declare를 사용함으로, 선언된 타입이 컴파일러가 타입을 검사할 때 통과되게 처리한다.

    ```bash
    📂 types
    ┣ 🥑 index.ts
    ┃
    ┣ 📂 data # 애플리케이션 내 Data와 관련된 정적타입들에 대한 선언
    ┃    ┣ 🥑 index.ts
    ┃    ┗ 🗿 data.d.ts
    ┃
    ┣ 📂 global # 프로젝트 전체에 적용되는 style과 파일 타입에 대한 선언
    ┃    ┣ 🥑 index.ts
    ┃    ┣ 🗿 declare.d.ts
    ┃    ┗ 🗿 styled.d.ts
    ┃
    ┣ 📂 hooks # 커스텀훅과 관련된 정적타입들에 대한 선언
    ┃    ┣ 🥑 index.ts
    ┃    ┗ 🗿 hooks.d.ts
    ┃
    ┣ 📂 network # AXIOS 통신과 관련된 정적타입들에 대한 선언
    ┃    ┣ 🥑 index.ts
    ┃    ┣ 🗿 async.d.ts
    ┃    ┗ 🗿 responseType.d.ts
    ┃
    ┗ 📂 props # props 전달과 관련된 정적타입들에 대한 선언
        ┣ 🥑 index.ts
        ┗ 🗿 props.d.ts
    ```

  3. 코드유지보수 및 가독성을 위한 Shared > Routes 폴더

  - 초기 APP.tsx 파일 안에 모든 Route를 넣는 방식을 채택했었으나, Route가 많아질수록 코드유지보수 및 가독성이 떨어지는 문제점을 발견함
  - 이를 해결하고자, shared 폴더를 만들어 공통된 Header에 따른 Route들을 분리함
  - App.tsx에서는 shard 폴더 안의 분리된 Routes를 import해서 사용함
          ```tsx
            const App: React.FC = () => {
            return (
              <BrowserRouter>
                <GlobalStyled />
                <Shared.MainRoutes />
                <Shared.AuthRoutes />
                <Shared.ProtectiveRouters />
                <Shared.ChatRoutes />
              </BrowserRouter>
            );
          };
          ```
    </details>

## 트러블슈팅

1.  ### 성능최적화 :  Form 태그의 input 태그들의 리렌더링 제어 및, 입력에 따른 조건부 상태메시지

- 상황 : inputValue에 따른 조건부 메시지 노출과 관련하여, onChange, onBlur 이벤트에 대응하며, input.name에 따라 각각 동작하는 상태메시지가 요구됨

  - email을 예로들 때,
    - (1) : !!input.value : 메시지 없음
    - (2) : (example@web.com) : 이메일형식 미달 : `이메일을 입력해주세요.`
    - (3) : (example@web.com) : 이메일형식 충족 : `이메일 형식에 부합합니다.`
    - (4) : onBlur(api 통신, 중복메일 확인) : `이미 사용중인 이메일입니다.`
    - (5) : onBlur(api 통신, 사용가능 확인) : `사용가능한 이메일입니다.`<br/><br/>

  <details>
  <summary>해결과정 및 결과 : inputValue 및 상태메시지의 리덕스를 통한 전역상태관리, 조건충족 시 서버통신 </summary>

      컴포넌드에서 발생되는 리렌더링을 추적하기 위해서 Chrome 브라우저에서 제공하는 React DevTool을 활용하여 해당 과정을 추적하였다.

  1.  리펙토링 전, 최초의 코드

      <details>
      <summary>내용 상세보기</summary>

      ```tsx
      // 하나의 useState와 input Atom으로 signInfo 객체의 각각의 프로퍼티를 props로 전달
      const [signInfo, setSignInfo] = useState<Type.UserInfoCheckPW>({
        email: "",
        password: "",
        pwChecked: "",
        nickname: "",
        phoneNumber: "",
        gender: "",
        birthdate: "",
        isAdmin: false,
        admincode: "E002",
      });
      ```

      - 문제점 : 하나의 value만 변경되도 signIfo의 모든 값들이 리렌더링 발생 <br/> <br/>

      ```tsx
      // input Value에 대한 유효성 검사와 하나의 useState 상태메시지
      const [validiteMsg, setValiditeMse] = useState<Type.ValiditeMsg>({
        validteEmail: ["", false],
        validtepassword: ["", false],
        passwordChMsg: ["", false],
      });

      const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setSignInfo({ ...signInfo, [name]: value });

        if (name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          emailRegex.test(value)
            ? setValiditeMse({
                ...validiteMsg,
                validteEmail: ["사용 가능한 이메일입니다.", true],
              })
            : setValiditeMse({
                ...validiteMsg,
                validteEmail: ["이메일을 입력해주세요(exam@.exam.com)", false],
              });
        }
      };
      ```

      - 상태메시지의 화면표시 : 커스텀훅에서 변경되는 validiteMsg를 컴포넌트에서 전달받아, 화면에 노출
      - 문제점 : validiteMsg 속 하나의 value만 변경되도 전체 validiteMsg의 리렌더링 발생

      </details><br/>

  2.  리펙토링 1차, useState를 커스컴훅에서 관리하여 모듈화 진행

      <details>
      <summary>내용 상세보기</summary>

      ```tsx
      export const useSignupInput = ({ name }: any): any => {
        const [input, setInput] = useState<string>("");

        const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        };
        return {input,onChangeInput }
      ```

      - Signup 컴포넌트 속 하나의 state로 관리되던 여러 input들의 연결고리를 끊고, 각각의 onChange에 대해서만 리렌더링 되도록 useState를 커스텀훅에서 관리하여 모듈화 함
        - 결과 : input들을 각각 리렌더링 동작시킴
        - 문제 : 분리된 input 컴포넌트의 값을 부모 컴포넌트로 끌어올려준 뒤, 통합해야하는 문제 발생
      </details><br/>

  3.  리펙토링 2차, 하위컴포넌트의 상태를 끌어올려 Form.onSubmit으로 POST 요청보내기

      <details>
      <summary>내용 상세보기</summary>

      - 리액트는 단방향을 지향하기에, 부모에서 상태를 내려주었으나, 그 결과 모든 Form태그 아래 하나의 input에서 값이 반경되더라고 모든 input이 리렌더링 되는 문제가 있었기에, 모듈화 하였지만 이를 부모컴포넌트로 끌어올려 하나의 상태로 서버와 통신하는 부분의 문제 발생
      - 접근 : 각각의 상태를 전역상태관리(Redux)로 값을 보내고, 취합된 값을 Form.onSubmit으로 통신하고자 함.

        ```tsx
        // 커스텀 훅
        export const useSignupInput = ({ name }: any): any => {
          const onBlurSignupDispatch = () => {
            dispatch(RTK.setSignupDate({ [`${name}`]: input }));
          };
        };

        // ReduxSlice
        const SignupSlice = createSlice({
          name: "SignupSlice",
          initialState: {} as any | {},
          reducers: {
            setSignupDate: (
              state,
              action: PayloadAction<Partial<SignupSliceType>>
            ) => {
              return { ...state, ...action.payload };
            },
            deleteSignupDate: () => {
              return {};
            },
          },
        });
        ```

        - 리덕스 모듈(setSignupDate) : 각각의 컴포넌트에서 나온 값을 모으는 역할을 함. 
          - name을 프로퍼티의 Keys로 설정하고 input을 Value로 설정 
          - initialState : {email: 'example@web.com'}
      </details> <br/>

  4.  리펙토링 3차, 하위컴포넌트의 상태에 따라 조건부 상태 메시지 기록하기 

          이 부분이 특히 어려웠다. 단순히 onChange 이벤트에만 대응하는 것이 아니라, onBlur 이벤트 발생시 email과 nickName의 경우 서버에 일치하는 값이 있는지 확인한 후에 해당 상태를 화면에 반영해주어야 했기 때문이다.

      <details>
      <summary>내용 상세보기</summary>  

      - 첫번째 시도, useState를 통한 각각의 메시지 관리 : 함수의 한계로, useState의 값이 입력대비 한 단계 늦는 사례 발생
      - 두번째 시도, 변수를 통한 각각의 메시지 관리 : 변수로 인해서 값의 변경을 컴포넌트가 인식하지 못하여 리렌더링이 발생되지 않음
      - 세번째 시도, 전역상태를 통한 상태관리 채택
      
        ```tsx
        // onChangeInput에서 제어할 onValiditeMsg 모듈 생성 
        const onValiditeMsg = (input: string): void => {
            if (name === "email") {
              input === ""
                ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }))
                : !emailRegex.test(input)
                ? dispatch(
                    RTK.setValiditeMsg({
                      type: name,
                      msg: ["이메일을 입력해주세요(exam@.exam.com)", false],
                    })
                  )
                : dispatch(
                    RTK.setValiditeMsg({
                      type: name,
                      msg: ["이메일 형식에 부합합니다.", false],
                    })
                  );
            } 
          };

        // (1) Input의 onChange 실행에 따라, ValiditeMsg 리덕스 모듈 동작
        const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
          setServerCheck(true);
          onValiditeMsg(e.target.value);
          setInput(e.target.value);
        };

        // (2) onBlurSignupDispatch 실행에 따라, 조건부 GET요청 실행 
        const [serverCheck, setServerCheck] = useState<boolean>(true);
        const { isSuccess: isSuccessEmailCheck,
                data: dataEmailCheck,
                isError: isErrorEmailCheck,
                error: errorEmailCheck,
          } = RTK.useGetEmailCheckQuery(input, { skip: serverCheck }); 
        const onBlurSignupDispatch = () => {
          name !== "pwChecked" && dispatch(RTK.setSignupDate({ [`${name}`]: input }));
          name === "email" && emailRegex.test(input) && setServerCheck(false);
        };
        
        useEffect(() => {
          isSuccessEmailCheck &&
            dispatch( RTK.setValiditeMsg({
                type: "email",
                msg: [dataEmailCheck, dataEmailCheck.includes("사용") ? true : false],
              })
            );
          isErrorEmailCheck && console.log(errorEmailCheck);
        }, [ isSuccessEmailCheck, dataEmailCheck, isErrorEmailCheck, errorEmailCheck, dispatch]);
        ```  

        - input 입력에 따라 2 가지 상황에서의 상태 메세지 제어가 요구되었다. 첫째는 onChangeInput, 둘째는 onBlurSignupDispatch 시 이다. 
          - onChangeInput : 입력값이 이메일 형식인지
          - onBlurSignupDispatch : 입력값이 서버에 등록된 값인지에 대한 판단
          - 두 상황에 따라 하나의 상태메시지의 관리가 요구됨 
          - 나아가 onBlurSignupDispatch에 따라 `useGetEmailCheckQuery`가 조건부 요청이 되어야 했음
            - 두 이벤트에 따라 `dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }))`를 동작
              - msg의 내용은 조건에 따른 내용이 기록되게 하였으며,
              - type을 name으로 설정하여 해당 내용을 꺼내어 화면에 기록하도록 설정하였다. 
      </details><br/>

  5.  리펙토링 최종, 부모컴포넌트로 전달된 조건부 상태메시지(객체) 묶음으로 인한 input 태그의 연결, 동시리렌더링 제어

      - input과 관련된 state는 분리했지만, validiteMsg에 대한 상태를 리덕스를 사용하지만, 결국 하나의 state를 사용한다는 점에서 메시지 부분에서 하나의 validiteMsg이 변견되면, 전체가 리랜더링되는 문제 발생

        <details>
        <summary>수정 전 코드</summary>        

          ```tsx
          // 기존 validiteMsgSlice 
            const validiteMsgSlice = createSlice({
              name: "validiteMsgSlice",
              initialState: {
                emailMsg: ["", false],
                nickNameMsg: ["", false],
                passwordMsg: ["", false],
                pwCheckedMsg: ["", false],
              } as any,
              // .... 
            });

            export const validiteMsgReducer = validiteMsgSlice.reducer;
            export const selectValiditeMsg = (state: any) => state.validiteMsgReducer;
            export const { setValiditeMsg, deleteValiditeMsg } = validiteMsgSlice.actions;


          // 컴포넌트에서의 사용 
          import React from "react";
          import * as SC from "../css";
          import * as Type from "../../types";
          import { useSignupInput } from "../../hooks";
          import * as RTK from "../../redux";

          export const SignUpInput: React.FC<Type.SignUpInputProps> = ( ) => {
            const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeMsg);

            return (
              <>
                {/* ...  */}
                {name === "email" && getValidateMsg.emailMsg && (
                  <SC.ValidateInputMsg
                    $signColor={getValidateMsg.emailMsg[1]}
                    children={getValidateMsg.emailMsg[0]}
                  />
                )}
              </>
            );
          };
          ```
        </details>


        <details>
        <summary>수정 후 코드 : input 별 [ 컴포넌트/커스텀훅 모델화 ], 이를 통해 연결고리 분리 input별 리렌저링 제어</summary>

        - 관련 input에 대한 컴포넌트 분리 + 해당 컴포넌트에 맞춘 커스텀훅 모델화 
          - SignUpInputE + useSignupEmail : onChange + onBlur(비동기통신 서버 중복확인) + 유효성검사
          - SignUpInputN + useSignupNickName : onChange + onBlur(비동기통신 서버 중복확인) + 유효성검사
          - SignUpInputP + useSignupPassword : onChange + 유효성검사
          - SignUpInputPWC + useSignupPWC : onChange + 유효성검사
          - SignUpInput + useSignup : 유효성 검사가 필요없는 컴포넌트 

        ```tsx
        // state.validiteMsgReducer에서 나가는 값에 대해서 분리 
        export const selectValiditeEMsg = (state: any) => state.validiteMsgReducer.emailMsg;
        export const selectValiditeNMsg = (state: any) => state.validiteMsgReducer.nickNameMsg;
        export const selectValiditePMsg = (state: any) => state.validiteMsgReducer.passwordMsg;
        export const selectValiditePWCMsg = (state: any) => state.validiteMsgReducer.pwCheckedMsg;

        // SignUpInputE : Eamil 관련된 input 컴포넌트 분리 
        import React from "react";
        import * as SC from "../css";
        import * as Type from "../../types";
        import { useSignupEmail } from "../../hooks";


        export const SignUpInputE: React.FC<Type.SignUpInputProps> = ({ 
          placeholder, name, type, length, inputRef, submitted }) => {
          const { input, getValidateMsg, onChangeInput, onBlurSignupDispatch } = useSignupEmail({
            name,
            submitted,
          });

          return (
            <>
              <SC.AuthInput
                ref={inputRef}
                type={type}
                value={input}
                onBlur={onBlurSignupDispatch}
                onChange={onChangeInput}
                maxLength={length}
                placeholder={placeholder}
              />
              <SC.ValidateInputMsg
                $signColor={getValidateMsg[1]}
                children={getValidateMsg[0]}
              />
            </>
          );
        };

        // SignUpInputE 에 맞춘 useSignupEmail을 별도로 구성 
        import { ChangeEvent, useEffect, useState } from "react";
        import * as RTK from "../../../redux";

        export const useSignupEmail = ({ name, submitted }: any): any => {

          const dispatch = RTK.useAppDispatch();
          const [input, setInput] = useState<string>("");
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const [serverCheck, setServerCheck] = useState<boolean>(true);
          const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeEMsg);

          const onValiditeMsg = (input: string): void => {
            input === ""
              ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }))
              : !emailRegex.test(input)
                ? dispatch(
                  RTK.setValiditeMsg({
                    type: name,
                    msg: ["이메일을 입력해주세요(exam@.exam.com)", false],
                  })
                )
                : dispatch(
                  RTK.setValiditeMsg({
                    type: name,
                    msg: ["이메일 형식에 부합합니다.", false],
                  })
                );
          }

          const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            setServerCheck(true);
            onValiditeMsg(e.target.value);
            setInput(e.target.value);
          };

          const onBlurSignupDispatch = () => {
            dispatch(RTK.setSignupDate({ [`${name}`]: input }));
            emailRegex.test(input) && setServerCheck(false);
          };

          const { isSuccess, data, isError, error } = RTK.useGetEmailCheckQuery(input, {
            skip: serverCheck,
          });

          useEffect(() => {
            setInput("");
          }, [submitted]);

          useEffect(() => {
            isSuccess &&
              dispatch(
                RTK.setValiditeMsg({
                  type: "email",
                  msg: [data, data.includes("사용") ? true : false],
                })
              );
            isError && console.log(error);
          }, [
            isSuccess,
            data,
            isError,
            error,
            dispatch,
          ]);

          return { input, getValidateMsg, onChangeInput, onBlurSignupDispatch }

        }
        ```        

        </details>

</details>

- github 환경변수 문제 
