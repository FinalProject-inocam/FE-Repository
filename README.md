# INNO-Moters

### [01 SKILLS](#01-skills)<br/>

### [02 서비스 아키택처 스타일 및 기술적 의사결정](#02-서비스-아키택처-스타일-및-기술적-의사결정)<br/>

-   [02-01 서비스 아키택처](#서비스-아키택처)<br/>
-   [02-02 기술적 의사결정](#기술적-의사결정라이브러리)<br/>

### [03 리팩토링 및 코드개션을 위한 노력](#03-리팩토링-및-코드개선을-위한-노력)<br/>

-   [03-01 1차 리팩토링](#1차-리팩토링---8월-1일)<br/>
-   [03-02 2차 리팩토링](#2차-리팩토링---8월-11-12일)<br/>
-   [03-02 3~5차 리팩토링](#35차-리팩토링하단의-트러블슈팅과-도전기술에-기록)<br/>

### [04 트러블 슈팅 및 도전기술](#04-트러블-슈팅-및-도전기술)<br/>

-   [04-01 첫번째주제 : 상태관리와 관련하여](#첫번째주제--상태관리와-관련하여)<br/>
    -   RTK
    -   RTKQ
    -   ContextAPI
    -   ThemeProvier
-   [04-02 두번째주제 : 성능최적화외 관련하여](#두번째주제--성능최적화와-관련하여)<br/>
-   [04-03 세번째주제 : 개발의 두 측면의 경험 증진](#세번째주제--개발의-두-측면의-경험-증진)<br/>

## 01 SKILLS

<div align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-blue?style=flat-square&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/JavaScript-yellow?style=flat-square&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/><img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/><img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"/><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/></br><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/><img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=Chartdotjs&logoColor=white"/><img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white"/><img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socketdotio&logoColor=white"/><img src="https://img.shields.io/badge/MSW-eb7434?style=flat-square&logo=&logoColor=white"/></br><img src="https://img.shields.io/badge/GitHub-000000?style=flat-square&logo=GitHub&logoColor=white"/><img src="https://img.shields.io/badge/GitHubActions-2088FF?style=flat-square&logo=GitHubActions&logoColor=white"/><img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white"/><img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white"/><img src="https://img.shields.io/badge/AWS CloudFront-000000?style=flat-square&logo=AmazonAWS&logoColor=white"/><img src="https://img.shields.io/badge/AWS Router53-000000?style=flat-square&logo=AmazonAWS&logoColor=white"/>
</div>

## 02 서비스 아키택처 스타일 및 기술적 의사결정

-   ### 서비스 아키택처

      <img src="https://raw.githubusercontent.com/FinalProject-inocam/.github/main/profile/img/005.png">

    01 `GitHubActions`<br/>
    <strong>secret</strong> : 을 사용하여 민감한 정보들을 저장하여 보안을 강화했고 워크플로우 파일 내에서 불러와 환경변수로 사용
    <strong>CI/CD Pipeline</strong> : main 브랜치에 코드가 푸시되면, GitHub Actions 워크플로우가 자동으로 실행.
    코드를 빌드하고, 테스트와 통합 테스트를 실행하여 모든 테스트가 통과하면 AWS S3로 자동 빌드, 배포함

    02 `AWS S3`<br/>
    AWS에서 제공하는 객체 스토리지로 정적파일(HTML, CSS, JS, 이미지 등) S3 버킷에 저장하여 빠르게 제공
    모든 데이터를 SSE를 사용하여 암호화 되어 저장함.

    03 `AWS CludFront`<br/>
    CloudFront를 이용하여 S3에 저장된 콘텐츠를 배포, 캐싱을 사용하여 S3에 요청 횟수를 줄여 비용을 절감하고 이미지나 비디오를 빠르게 전달할 수 있게 함. SSL을 사용하여 HTTPS 사용을 통해 보안을 강화함.

    04 `AWS Route53`<br/>
    Route 53의 높은 가용성과 확장성을 활용하여 웹서비스의 DNS를 안정적으로 관리.
    가용성과 확장성이 뛰어난 DNS 웹 서비스. 가비아로 구매한 도메인을 등록 연동하여 웹서비스 제공.
    서버의 상태를 모니터링 하고, 문제가 발생할 경우 트래픽을 백업 서버로 자동 전환.

-   ### 기술적 의사결정(라이브러리)
    | 라이브러리명      | 버전     | 기술적 의사결정                                                                                                                                                                                                                                     |
    | :---------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Typescript        | ^4.4.2   | TypeScript는 정적 타이핑 제공하고 타입을 명확하게 지정할 수 있으므로 컴파일 시점에서 오류를 확인할 수 있어 에러의 가능성을 줄일 수 있고, 코드가독성과 유지보수에 이점이 있어 코드를 명확하게 전달 할 수 있으므로 팀원들간의 협업의 장점이 있어 채택 |
    | RTK, RTKQ         | ^8.1.2   | 프로젝트의 상태관리를 중앙화시킴과 모듈화를 구조화시킬 수 있는 라이브러리로 추후 확장성과 유지보수의 접근성까지 생각했을 때 가장 합리적인 선택지라 판단함                                                                                           |
    | React-Route-dom   | ^6.14.2  | SPA 기반 컴포넌트 아키택처 스타일을 채택하고 있는 리액트에서 효과적인 라우팅 기법 활용과, 컴포넌트를 기반으로 리렌더링을 최소화 하기 위해 안정성이 높은 라이브러리 채택(중첩라우트(Outlet) 활용)                                                    |
    | Chartjs-2         | ^5.2.0   | 관리자 페이지의 데이터 시각화를 위해 차트를 그리기 위해 사용하였으며 간단한 사용성 으로 빠른 구현과 캔버스 기반의 빠른 렌더링 성능을 가지고 있다는 점에서 채택                                                                                      |
    | styled-components | ^6.0.5   | JS를 통해 동적 제어(css 메소드와 ThemeProvider)를 하기 위해 채택                                                                                                                                                                                    |
    | ThreeJS           | ^0.155.0 | 인터렉티브한 화면 구성을 위해 완성도가 높은 라이브러리 활용                                                                                                                                                                                         |
    | Socket.io         | ^4.7.2   | 민원상담 차원을 위한 실시간성과 다양한 브라우저에 호환되는 점을 보고 일반채팅과 화상채팅을 위해 채택                                                                                                                                                |
    | axios             | ^1.4.0   | API 호출 및 HTTP 요청을 처리하기 위해 간단한 사용법과 호환성을 이유로 채택                                                                                                                                                                          |
    | Msw               | ^1.2.3   | 가상서버를 구축하여 개발시간을 줄이고자 채택                                                                                                                                                                                                        |
    | lottie            | ^1.2.3   | 스플래쉬 화면의 역동적인 애니메이션 효과를 위해 채택                                                                                                                                                                                                |


## 03 리팩토링 및 코드개선을 위한 노력

### 1차 리팩토링 - 8월 1일

<details>
<summary>내용 살펴보기</summary>

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

### 2차 리팩토링 - 8월 11-12일

<details>
  <summary>내용살펴보기</summary>

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

-   초기 로딩 시점에 당장 필요하지 않지만 무거운 컴포넌트로 인해 로딩이 지연되는 문제를 인식
-   이를 개선하기 위해 해당 컴포넌트들의 로드를 미루어 성능을 최적화하려고 프로젝트 구조를 편성
-   React.lazy를 사용하여 대상 컴포넌트들 동적제어, Suspense를 사용하여 로딩화면 제어
-   lazy 대상 컴포넌트 : InoCar, Community, Threejs <br/><br/>

2. 타입선언 관련 코드컨벤션(Interface, declare)

-   hooks.d.ts : 커스컴훅과 관련된 타입선언이 기록되고 이름은 훅이름으로 설정, 사용하는 컴포넌트에서는 알리아스(as)를 통하여 Type임을 명시해준다.
-   타입선언과 Interface, declare

        -   `Interface` : 객체나 클래스 단위의 형태에 대한 명시적인 정의 타입 생성, extends를 통해서 앞선 Interface를 상속받아 프로토타입 체인을 형성한다.
        -   `declare` : 외부 라이브러리나 모듈의 타입을 확장하거나 정의할 때 사용되며, 외부 라이브러리의 타입 정보가 없을 경우 declare를 사용함으로, 선언된 타입이 컴파일러가 타입을 검사할 때 통과되게 처리한다.

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

        -   초기 APP.tsx 파일 안에 모든 Route를 넣는 방식을 채택했었으나, Route가 많아질수록 코드유지보수 및 가독성이 떨어지는 문제점을 발견함
        -   이를 해결하고자, shared 폴더를 만들어 공통된 Header에 따른 Route들을 분리함
        -   App.tsx에서는 shard 폴더 안의 분리된 Routes를 import해서 사용함
        `tsx

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
    `
    </details>

### 3~5차 리팩토링(하단의 트러블슈팅과 도전기술에 기록)

## 04 트러블 슈팅 및 도전기술

### [ 첫번째주제 ] 상태관리와 관련하여

<details>
<summary>[ 첫번째주제 ] 내용 살펴보기</summary>

1.  <details>
      <summary>전역상태관리와 RTK</summary>
      <hr/>
      리액트에서의 상태관리는 애플리케이션의 복잡성을 다루는 핵심 요소로 Redux ToolKit(RTK)을 사용하여 제어함.
      RTK를 사용하여 로직을 간결하게 만들었고 불변성을 쉽게 유지하는데 용이함.
    </br></br>
    리덕스 툴킷을 적용한 모듈

    ```tsx
    import { PayloadAction, createSlice } from "@reduxjs/toolkit";

    const threejsSlice = createSlice({
      name: "ThreejsSlice",
      initialState: {} as any | {},
      reducers: {
        setThreejs: (\_, action: PayloadAction<any>) => {
          return {...action.payload}
        },
      },
    });

    export const ThreejsReducer = threejsSlice.reducer;
    export const selectThreejs = (state: any) => state.ThreejsReducer;
    export const { setThreejs } = threejsSlice.actions;

    ```

    <hr/>
    </details>

2.  <details>
      <summary>네트워크 상태관리와 RTKQ</summary>
      <hr/>
      RTK Query는 Redux Toolkit (RTK)의 일부로, API 호출과 캐싱, 상태 관리 등을 간소화하고 자동화하는 기능을 제공. 이로 인해 별도의 미들웨어나 상태 관리 로직 없이도 서버와의 통신을 효율적으로 처리가 가능.
      RTK Query를 사용하여 API호출 간략화 하고 자동으로 캐싱을 관리해줌으로서 네트워크 요청을 최소화 하고, 불필요한 렌더링고 서버부하를 줄임.
      </br></br>
      간결한 api 호출 코드

    ```tsx
          /* / 01 Auth / -------------------------------------------------------- */
        // loginRTK
        postLogin: build.mutation({
          query: (data) => ({
            url: "/api/auth/login",
            method: "post",
            data,
            types: "login",
          }),
        }),
        // getLogout
        getLogout: build.query({
          query: () => ({
            url: `/api/auth/logout`,
            method: "get",
            types: "logout",
          }),
        }),
        // SNSLogin - kakao, google, naver
        loginSNSRTK: build.query({
          query: ({ types, code }) => ({
            url: `/api/auth/login/${types}${code}`,
            method: "get",
          }),
        }),
    ```

      <hr/>
      </details>

3.  <details>
          <summary>간결한 상태관리를 위한 ContextAPI</summary>
          <hr/>
          Context API는 React의 내장 기능으로, 복잡한 상태 로직이나 라이브러리 없이도 컴포넌트 간에 상태를 쉽게 공유
          상태를 중앙에서 관리함으로 코드의 복작성을 줄이고 props drilling이 발생할 경우를 제어하여, 컴포넌트 간의 상태 공유가 간편해지고 개발속도 향상 및 유지보수에 용이함.
          </br></br>
          부모 컴포넌트에 context provider로 감싸줌

    ```tsx
    export const WrappingDetail: React.FC = () => {
    	const { mapRef, isLoading, data, isError, error } = Hooks.useWrappingDetail();

    	if (isLoading) return <div>... 로딩중</div>;
    	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
    	else {
    		return (
    			<Hooks.WrappingDetailContext.Provider value={data}>
    				<SC.DetailOutline $fd='column' $gap={30}>
    					{/* KakaoMaps /---------------------------/ */}
    					<SC.DetailKakaoMaps>
    						<section ref={mapRef} />
    						<SC.MapFadeBottom />
    					</SC.DetailKakaoMaps>

    					{/* DetailContent /-----------------------/ */}
    					<SC.DetailContent $gap={20}>
    						<CP.DetailInfoArea />
    						<CP.DetailReviewArea />
    					</SC.DetailContent>
    				</SC.DetailOutline>
    			</Hooks.WrappingDetailContext.Provider>
    		);
    	}
    };
    ```

      </br>
    자식 컴포넌트에서 props를 사용하지않고 쉽게 꺼내 씀.
      </br>

    ```tsx
    export const DetailInfoArea: FC = () => {
    const data = useContext(Hook.WrappingDetailContext);
    if (!data) return null;
    const { shopName, address, banner, avgStar, reviewCount, bussinessDay, bussinessHour, phoneNumber, detail } = data;

        return (
          <SC.FlexBox $fd='column' $gap={5} $jc={"flex-start"} style={{ position: "relative" }}>
            {/* DetailInfo */}
            <SC.DetailInfoLayout>
              <FigureObjectFitImg width={`100%`} height={`300px`} src={banner[0]} alt='SomeImg' />
              <SC.DetailInfoInner $fd='column' $ai='flex-start' $gap={10}>
                <SC.CustomH1 children={shopName} />
                <SC.CustomH2 children={address} />
                <SC.FlexBox $jc='space-between' style={{ width: "100%", height: "85px", padding: "10px 0" }}>
                  <SC.GridBox $gtc='repeat(3, 1fr)'>
                    <SC.FlexBox $fd='column' $gap={10}>
                      <span style={{ fontWeight: "bold" }}>영업시간</span>
                      <span>{bussinessHour}</span>
                    </SC.FlexBox>

    ```

    <hr/>
    </details>

4.  <details>
    <summary>전역스타일링을 위한 ThemeProvider  </summary>
    <hr/>
    ThemeProvider로 인해 애플리케이션 전체에 일관된 스타일을 적용 및 제공하여 직관적이고 일관된 사용자 경험 제공.
    테마를 쉽게 변경할 수 있도록 UI 컴포넌트 제공. Context API를 기반으로 작동, 상태 변경시 불필요한 렌더링이 발생하지 않아 웹 렌더링 성능 향상.

    ```tsx
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    root.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary FallbackComponent={Error}>
            <App />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
    ```

    global style 적용

    ```tsx
    /* About css styled ---------------------------------------------- */

    const Flex = sc.css<Partial<Styled>>`  display: flex;
      flex-direction: ${({ $fd }) => ($fd ? $fd : "row")};
      justify-content: ${({ $jc }) => ($jc ? $jc : "center")};
      align-items: ${({ $ai }) => ($ai ? $ai : "center")};
      gap: ${({ $gap }) => ($gap ? `${$gap}px` : "none")};`;

    const Grid = sc.css<Partial<Styled>>`  display: grid;
      grid-template-columns: ${({ $gtc }) => ($gtc ? $gtc : "repeat(2, 1fr)")};
      // repeat(7, 1fr) || repeat(auto-fill, minmax(20%, auto));
      grid-template-rows: ${({ $gtr }) => ($gtr ? $gtr : "none")};
      // 구체적인 row를 알고 있을 때 // auto || repeat(3, minmax(100px, auto));
      grid-auto-rows: ${({ $gar }) => ($gar ? $gar : "none")};
      // 구체적인 row를 모를 때 // //minmax(100px, auto);
      gap: ${({ $gap }) => ($gap ? `${$gap}px` : "none")};
      column-gap: ${({ $cgap }) => ($cgap ? `${$cgap}px` : "none")};
      row-gap: ${({ $rgap }) => ($rgap ? `${$rgap}px` : "none")};`;

    const cursor = sc.css`  cursor: pointer;`;

    /_ About Div styled ---------------------------------------------- _/;
    const FlexBox = sc.styled.div<Partial<Styled>>`  ${Flex}`;

    const GridBox = sc.styled.div<Partial<Styled>>`  ${Grid}
      width:100%;
      background-color:${({ $color }) => $color};`;

    const GridMergedSpace = sc.styled.div<Partial<Styled>>`  grid-column-start: ${({ $mergedgcs }) =>
    	$mergedgcs ? $mergedgcs : "auto"};
      grid-column-end: ${({ $mergedgce }) => ($mergedgce ? $mergedgce : "auto")}; // span 2;
      grid-row-start: ${({ $mergedgrs }) => ($mergedgrs ? $mergedgrs : "auto")};
      grid-row-end: ${({ $mergedgre }) => ($mergedgre ? $mergedgre : "auto")}; // span 3;`;
    ```

    컴포넌트에서 사용

    ```tsx
    const AdminNavLayout = styled.div<Partial<Styled>>`
      ${SC.Flex}
      margin-left: auto;
      width: 70%;

      h3 {
        ${SC.Flex}
        font-size: 1rem;
        width: 100%;
        padding: 20px 0;
        border-radius: ${({ $state }) => $state ? "20px 0 0 20px" : "none"};
        background-color: ${({ $state, theme }) => $state ? theme.color.lightgray1 : theme.color.adminNav};
        color: ${({ $state }) => $state ? "black" : "white"};
      }

      .currentLogation, .top, .bottom {
        position: absolute;
      }

      .currentLogation {
        width: 10px;
        height: 10px;
        background-color:${({ $state, theme }) => $state ? theme.color.lightgray1 : theme.color.adminNav};
      }
    ```

    <hr/>
    </details>

</details>

### [ 두번째주제 ] 성능최적화와 관련하여

<details>
<summary>[ 두번째주제 ] 내용 살펴보기</summary>

1.  <details>
    <summary>초기로딩 속도 개선을 위한 cloudfront</summary>
    <hr/>
      목적 : 사용자 경험 향상을 한 초기 로딩 속도를 개선
      <br/>
      방법 : 배포 환경을 제어하고 있는 cloudfront의 캐싱기능을 활용하기로함. cloudfront의 캐싱은 엣지 로케이션에서 콘텐츠를 이루어지며 가까운 위치에서 데이터를 제공하여 사용자에게 빠르게 데이터를 전달해준다는 장점이 있음. 또한 조건부 요청 및 무효화를 통해 콘텐츠 업데이트를 관리함. 이를 통해 초기 로딩 속도를 높여냄.
    <br/>
    </details>
2.  <details>
    <summary>React.lazy()</summary>
    <hr/>
      목적 : SPA 개발을 위한 컴포넌트 아키텍처인 리액트의 단점인 번들링을 제어하고자 함. 
      <br/>
      방법 : 무거운 컴포넌트가 많은 프로젝트 특성상 초기 번들 과정을 제어해야했음. React.lazy()를 사용하여 무거운 컴포넌트를 동적제어함으로 번들링을 줄일 수 있었음. 또한 이때 걸리는 로딩 시간 중의 사용자 경험 향상을 위해 Suspense를 사용하여 로딩화면 제어함.
      
      <br/>
      lazy( ) 설정

    ```tsx
    export const LazyInnoCar = lazy(() =>
      import("../main/InnoCar").then(({ InnoCar }) => ({ default: InnoCar }))
    );
    export const LazyCommunity = lazy(() =>
      import("../main/Community").then(({ Community }) => ({
        default: Community,
      }))
    );
    ```

    lazy( ) 활용

    ```tsx
    <Route
      path="innocar"
      element={
        <Suspense
          fallback={<div>Loading...</div>}
          children={<Page.LazyInnoCar />}
        />
      }
    />
    ```

    </details>

3.  <details>
    <summary>리렌더링제어 - Form태그와 inputs</summary>
    <hr/>
     목적 : 리액트의 리렌더링을 제어해 성능을 향상 하고자 함. 
     <br />
     방법 : 그 중에서도 잦은 리렌더링이 일어나는 Form 과 input 사이의 연관성을 단절시켜 상태 단위로 리렌터링이 제어가 이뤄질 수 있도록 함. 이 과정에서 컴포넌트-커스텀훅으로 코드를 분리하여 컴포넌트 재활용과 모듈화가 이뤄질 수 있도록 함.

      <br />
      input각각을 컴포넌트로 분리하여 관리

    ```tsx
      <SC.SignUpInputN
      type='text'
      name='nickname'
      length={20}
      inputRef={inputRef1}
      submitted={submitted}
      placeholder='닉네임을 입력해주세요'
    />

    <SC.SignUpInputP
      name='password'
      length={20}
      inputRef={inputRef6}
      submitted={submitted}
      placeholder='비밀번호를 입력해 주세요.'
    />
    ```

    </details>

4.  <details>
    <summary>이미지 리사이징과 지연로딩</summary>
    <hr/>
    목적 : 백엔드와의 통신 속도를 높여 사용자 경험을 향상시키고자 함.
    <br />
    방법 : 특히 통신에서 커다란 용량을 차지하는 이미지 업로드 부분을 제어하기로 함. 이미지 업로드시 리사이징을 과정을 통해 파일의 용량을 줄여냄. 또한 이미지 지연로딩(required)을 통해 필요할 때만 이미지가 로딩이 될 수 있도록 하여 초기 로딩속도를 개선해냄.
    <br/>
    <br/>
    이미지 리사이징

    ```tsx
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(getCommunityData)], { type: "application/json" })
    );
    ```

    </details>

5.  <details>
    <summary>중첩 라우트와 프로텍티드 라우터</summary>
    <hr/>
    목적 : 코드 모듈화와 초기 번들 크기 줄임으로 사용자 경험을 향상시키고자 함. 
    <br/>
    방법 : 중첩 라우트를 활용하여 각 헤더에 맞게 컴포넌트를 분리시킴으로 목적을 달성할 수 있었음. 또한 제한 페이지 접근을 관리하기 위해 중첩 라우트를 통한 프로텍티드 라우터를 사용함. 프로텍티드 라우터는 조건부 라우팅 설정을 통해 원하는 기능을 수행할 수 있도록 함.

    <br/>
    프로텍티드 라우터

    ```tsx
    export const ProtectiveRouter: React.FC = () => {
      const { decodeLoaded, sub } = useProtectiveRouter();

      return !decodeLoaded ? (
        <div />
      ) : sub ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} replace={true} />
      );
    };
    ```

    </details>
    </details>

### [ 세번째주제 ] 개발의 두 측면의 경험 증진

<details>
<summary>[ 세번째주제 ] 내용 살펴보기</summary>
  1.  <details>
      <summary>사용자측면 : 루트경로의 Three.js와 스플래시 스크린</summary>
      <hr/>

      ```tsx
      const { nodes, materials } = useGLTF("/scene.gltf") as IGLTF;
      ```
      public 폴더에 저장되어 있는 `gltf`파일을 불러오는 부분이 루트경로에 있었기에, 사용자로 하여금 웹페이지 첫 진입시 지루함을 줄 수 있는 부분이 발생되었습니다. 

      개선은 스플래시 스크린을 도입함으로 해당문제에 접근했습니다. 초기 3초의 시간을 주어 사용자에게 먼저 화면을 보여주고, 충분히 useGLTF의 로딩문제가 해결되었을 때 화면을 보여주는 처리를 했습니다. 

      `Three.js`는 저희 프로젝트에서 도전한 기술 중에 하나입니다. 정적화면에 생동감을 주기 위해 3D개체를 넣는 부분을 고려했고, glft 파일을 통해 해당 기술을 구현했습니다. 진행 과정에서 `directionalLight`조명을 주는 부분과  `camera`의 위치과 화각을 잡는 부분에 있어서의 여러움이 있었지만, 협업을 통해 자료를 조사했고 해당 기술을 구현했습니다. 나아가 이벤트를 주기 위해 더블클릭시 3D 개체가 회전하는 부분을 제어했습니다. 해당 부분을 useSpring 훅을 통해서 애니메이션으로 제어하고자 하여 jsx에서 먼저 구현하고, tsx에 적용하는 부분에서 발생된 타입 문제로 애니메이션 효과는 더하지 못함에 아쉬움이 남습니다.

      <hr/>
      </details>  
  2.  <details>
      <summary>채팅과 웹RTC의 동적 offer생성, 그리고 로딩이미지 : </summary>
      <hr/>
      01<br/>
      민원상담과 관련되 기능을 구현 하며 실시간 통신을 지원하고, 브라우저의 범용적 확장을 지원하는 socket.io-client를 도입하였습니다. 

      먼저 채팅과 관련된 부분입니다. 라우팅 전략에 따라 채팅과 관련된 경로는 2개였습니다. 중첩라우팅에 따라 chat 라우터가 있었고, 조회된 room을 :id로 하여 상세경로로 들어가게 했습니다. 문제는 url에 `room`이름이 노출된다는 이슈가 있었습니다. 이는 룸으로 상대방의 채팅방에 접속할 수 있다는 것을 의미하기도 하여 보안에 문제가 있었습니다. 

      ```tsx
      const onEnterRoom = () => {
        dispatch(deleteChatMsg())
        onNavigate({url:"room",  opts: { state: room }})()
      }
      ```

      해당문제는 클릭이벤트로 채팅방에 접속할 때, React-route-dom에서 제공하는 state 메소드에 은닉하였고, 해당 정보를 추출하여 소켓통신을 하게 함으로 해당 문제를 해결했습니다. 

      02<br/>
      다음으로는 웹RTC의 시그널링과 관련된 문제입니다. 문제는 먼저 접속한 Peer가 상대 Peer가 영상정보를 생성하기 전에 발송하는 candidate를 받아버려 화상통신이 되지 않는다는 문제였습니다. 이 부분을 개선하고자, setTimeOut을 통해 offer 생성을 제어하였습니다. 

      ```tsx
        useEffect(() => {
        if (showWebRTC) {
          getMedia()
          makeConnection()

          if (socketRef.current) {
            socketRef.current.emit("joinRTC", { room, username: sub })

            socketRef.current.on("joinedRTC", async () => {
              setTimeout(() => {
                streamRef.current && createOffer()
              }, 3000)
            })

            socketRef.current.on("getOffer", getoffer => {
              createAnswer(getoffer)
            })

            socketRef.current.on("getAnswer", getanswer => {
              peerRef.current && peerRef.current.setRemoteDescription(getanswer);
            })

            socketRef.current.on("getCandidate", getcandidata => {
              peerRef.current && peerRef.current.addIceCandidate(getcandidata);
            })
          }
        }
      ```

      그러나 이러한 제어는 사용자로 하여금 빈화면을 바라보게 함으로 연결되었습니다. 이 문제에 대한 제어로 동적이미지(.git)를 삽입하여 기다림에 대한 지루함을 개선하고자 하였습니다. 

      ```tsx
      return ( 
      {/* ...  */}

      <SC.GridBox $gtc="1fr 2fr" $gtr="1fr" style={{ position: "relative" }}>
        <SC.Video ref={peerAVideoRef} autoPlay />
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* 동적 이미지를 삽입한 부분입니다.  */}
          {!peerStream && <SC.LoadingImg src={ASS.loadingInnoLogo} alt="chattingLoading" />}
          <SC.Video ref={peerBVideoRef} autoPlay />
        </div>


        <SC.FlexBox style={{ position: "absolute", bottom: "10px", left: "10px" }} $gap={10}>
          <SC.WebRTCStateBTN
            onClick={onMute}
            children={<img
              alt="mikeState" src={!mute ? ASS.mikeOn : ASS.mikeOff} />} />
          <SC.WebRTCStateBTN
            onClick={onCamera}
            children={<img
              alt="cameraState" src={!camera ? ASS.cameraOn : ASS.cameraOff} />} />
        </SC.FlexBox>
        <SC.WebRTCStateBTN
          $types="closeBTN"
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={onToggleWebRTC}
          children={<img
            alt="closeBTN" src={ASS.closeBTN} />} />
      </SC.GridBox>
      )
      ```

      <hr/>
      </details>  
  3.  <details>
      <summary>개발자측면 : 프로젝트 자동화 및 환경변수의 보안문제 </summary>
      <hr/>
      01<br/>
      먼저는 AWS의 IAM을 생성하여 S3로 파일을 간편하게 업로드 하기 위한 준비를 했습니다. 
      
      [관련 내용 정리, 19Edwin92 Github](https://github.com/19Edwin92/FrentEnd-study/blob/main/CICD/03S3-IAM%20설정.md)

      02<br/>
      다음으로는 .yml 파일을 작성함으로 GitHubActions로 CD를 구성하는 일이었습니다. 최종프로젝트를 준비하며, 이전에 시도한 내용들이 있어서 쉽게 해당 내용을 구성할 수 있었습니다. 저희는 dev가 변경되면 지속적 배포가 동작하도록 설정하였습니다. 

      [코드 살펴보기](https://github.com/FinalProject-inocam/FE-Repository/blob/dev/.github/workflows/main.yml)

      03<br/>
      다음으로는 민간한 환경변수와 관련된 설정입니다. 프로젝트 파일에서 git 체계에서 제외처리를 했더라도, 빌드파일시에 환경변수 업로드다는 점의 문제를 인지했고, 환경변수를 github.actions.secrets에서 생성되게 함으로 보안성을 높였습니다. 
      <hr/>
      </details>
  4.  <details>
      <summary>개발자측면 : 빠른 API 설계를 위한 msw 구축 </summary>
      <hr/>
      프로트개발에서 고민되는 부분은 서버개발이 완료되기까지 API를 전달받지 못한다는 부분의 문제입니다. 관련 문제를 개선하고 프론트엔드 개발을 향상하기 위해서 msw를 구축하여, 사전에 API에 대한 점검을 진행했습니다. 명세서를 기준으로 작성하여 추후 백엔드 개발자와 실제 API 통신을 했을 때 발생될 수 있는 상황들을 사전에 제어함으로 효율적인 대화가 이뤄질 수 있는 준비를 마련했습니다. 
      <hr/>
      </details>    
  5.  <details>
      <summary>개발자측면 : 중복제거를 위한 리액트 모듈 인덱스와 컨테이터 컴포넌트로서의 커스텀 훅 모듈화 </summary>
      <hr/>
      리액트 모듈 인덱스를 도입하여 import 구문을 감소시켰습니다. export를 통해서 컴포넌트 단위로 파일을 연결지을 때, 해당 방법을 사용하지 않는다면 import 구문이 무거워진다는 부분을 인지하여 해당 부분을 개선하고자 했습니다. 이를 통해 간결한 소스코드 작성을 이루었고, 해당 폴더 내에서 파일이동을 자유롭게 할 수 있도록 마련함으로 소스코드 개발측면의 향상을 이루어냈습니다. 

      ```tsx
      import React from "react";
      import * as SC from "../css";
      import * as Type from "../../types";
      import { useSignupInput } from "../../hooks";
      import * as RTK from "../../redux";
      ```

      다음으로는 커링함수와 즉시실행을 통하여 이벤트를 제어했으며, 함수들을 컴포넌트 단위에서 커스텀훅으로 분리하여 뷰화면과 로직부분을 각각 작성하게 함으로 각 부분의 유지보수가 원할하게 진행될 수 있도록 코드를 개선하였습니다. 

      ```tsx
      export const Signup: React.FC = () => {
        const {
          inputRef1,
          inputRef2,
          inputRef3,
          inputRef4,
          inputRef5,
          inputRef6,
          inputRef7,
          inputRef8,
          submitted,
          check,
          adminCheck,
          onSubmitSign,
        } = useSignup();
        const LayoutRef = useLayoutRef()

        return (
            <SC.FlexBox ref={LayoutRef} style={{paddingTop:"90px"}}>
              <SC.AuthForm onSubmit={onSubmitSign} $gap={40} $width={"920px"}>
              {/* ... */}
              </SC.AuthForm>
            </SC.FlexBox>  
        )
      } 
      ```
      <hr/>
      </details>        
</details> 
