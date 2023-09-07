# INNO-Moters

### [01 SKILLS](#01-skills)<br/>
### [02 서비스 아키택처 스타일 및 기술적 의사결정](#02-서비스-아키택처-스타일-및-기술적-의사결정)<br/>

- [02-01 서비스 아키택처](#서비스-아키택처)<br/>
- [02-02 기술적 의사결정](#기술적-의사결정라이브러리)<br/>

### [03 리팩토링 및 코드개션을 위한 노력](#03-리팩토링-및-코드개선을-위한-노력)<br/>

- [03-01 1차 리팩토링](#1차-리팩토링---8월-1일)<br/>
- [03-02 2차 리팩토링](#2차-리팩토링---8월-11-12일)<br/>
- [03-02 3~5차 리팩토링](#35차-리팩토링하단의-트러블슈팅과-도전기술에-기록)<br/>

### [04 트러블 슈팅 및 도전기술](#04-트러블-슈팅-및-도전기술)<br/>

- [04-01 첫번째주제 : 상태관리와 관련하여](#첫번째주제--상태관리와-관련하여)<br/>
  - RTK
  - RTKQ
  - ContextAPI
  - ThemeProvier
- [04-02 두번째주제 : 성능최적화외 관련하여](#두번째주제--성능최적화와-관련하여)<br/>
- [04-03 세번째주제 : 개발의 두 측면의 경험 증진](#세번째주제--개발의-두-측면의-경험-증진)<br/>

## 01 SKILLS
<div align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-blue?style=flat-square&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/JavaScript-yellow?style=flat-square&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/><img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/><img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"/><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/></br><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/><img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=Chartdotjs&logoColor=white"/><img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white"/><img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socketdotio&logoColor=white"/><img src="https://img.shields.io/badge/MSW-eb7434?style=flat-square&logo=&logoColor=white"/></br><img src="https://img.shields.io/badge/GitHub-000000?style=flat-square&logo=GitHub&logoColor=white"/><img src="https://img.shields.io/badge/GitHubActions-2088FF?style=flat-square&logo=GitHubActions&logoColor=white"/><img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white"/><img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white"/><img src="https://img.shields.io/badge/AWS CloudFront-000000?style=flat-square&logo=AmazonAWS&logoColor=white"/><img src="https://img.shields.io/badge/AWS Router53-000000?style=flat-square&logo=AmazonAWS&logoColor=white"/>
</div>

## 02 서비스 아키택처 스타일 및 기술적 의사결정

- ### 서비스 아키택처

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


- ### 기술적 의사결정(라이브러리) 
  |라이브러리명|버전|기술적 의사결정|
  |:--|:--|:--|
  |Typescript|^4.4.2| TypeScript는 정적 타이핑 제공하고 타입을 명확하게 지정할 수 있으므로 컴파일 시점에서 오류를 확인할 수 있어 에러의 가능성을 줄일 수 있고, 코드가독성과 유지보수에 이점이 있어 코드를 명확하게 전달 할 수 있으므로 팀원들간의 협업의 장점이 있어 채택|
  |RTK, RTKQ|^8.1.2| 프로젝트의 상태관리를 중앙화시킴과 모듈화를 구조화시킬 수 있는 라이브러리로 추후 확장성과 유지보수의 접근성까지 생각했을 때 가장 합리적인 선택지라 판단함|
  |React-Route-dom|^6.14.2| SPA 기반 컴포넌트 아키택처 스타일을 채택하고 있는 리액트에서 효과적인 라우팅 기법 활용과, 컴포넌트를 기반으로 리렌더링을 최소화 하기 위해 안정성이 높은 라이브러리 채택(중첩라우트(Outlet) 활용)|
  |Chartjs-2|^5.2.0| 관리자 페이지의 데이터 시각화를 위해 차트를 그리기 위해 사용하였으며 간단한 사용성 으로 빠른 구현과 캔버스 기반의 빠른 렌더링 성능을 가지고 있다는 점에서 채택|
  |styled-components|^6.0.5| JS를 통해 동적 제어(css 메소드와 ThemeProvider)를 하기 위해 채택|
  |ThreeJS|^0.155.0| 인터렉티브한 화면 구성을 위해 완성도가 높은 라이브러리 활용|
  |Socket.io|^4.7.2| 민원상담 차원을 위한 실시간성과 다양한 브라우저에 호환되는 점을 보고 일반채팅과 화상채팅을 위해 채택|
  |axios|^1.4.0| API 호출 및 HTTP 요청을 처리하기 위해 간단한 사용법과 호환성을 이유로 채택| 
  |Msw|^1.2.3| 가상서버를 구축하여 개발시간을 줄이고자 채택|   
  |lottie|^1.2.3| 스플래쉬 화면의 역동적인 애니메이션 효과를 위해 채택|   

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


### 3~5차 리팩토링(하단의 트러블슈팅과 도전기술에 기록)


## 04 트러블 슈팅 및 도전기술   
### [ 첫번째주제 ] 상태관리와 관련하여
<details>
<summary>[ 첫번째주제 ] 내용 살펴보기</summary>
  
  1.  <details>
      <summary>전역상태관리와 RTK</summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>  
  2.  <details>
      <summary>네트워크 상태관리와 RTKQ</summary>
      <hr/>
       - 무한스크롤과 페이지네이션, 쓰로틀링과 디바운씽
      <hr/>
      </details>  
  3.  <details>
      <summary>간결한 상태관리를 위한 ContextAPI</summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>  
  4.  <details>
      <summary>전역스타일링을 위한 ThemeProvider  </summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>        
 
</details>

### [ 두번째주제 ] 성능최적화와 관련하여
<details>
<summary>[ 두번째주제 ] 내용 살펴보기</summary>

  1.  <details>
      <summary>React.lazy()</summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>  
  2.  <details>
      <summary>리렌더링제어 - Form태그와 inputs</summary>
      <hr/>
       내용이 들어갑니다. 
      <hr/>
      </details>  
  3.  <details>
      <summary>이미지 리사이징과 지연로딩</summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>  
</details> 

### [ 세번째주제 ] 개발의 두 측면의 경험 증진
<details>
<summary>[ 세번째주제 ] 내용 살펴보기</summary>

  1.  <details>
      <summary>사용자측면 : 루트경로의 Three.js와 스플래시 스크린</summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>  
  2.  <details>
      <summary>웹RTC의 동적 offer생성과 로딩이미지 : </summary>
      <hr/>
       내용이 들어갑니다. 
      <hr/>
      </details>  
  3.  <details>
      <summary>개발자측면 : 프로젝트 자동화 및 환경변수의 보안문제 </summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>
  4.  <details>
      <summary>개발자측면 : 빠른 API 설계를 위한 msw 구축 </summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>    
  5.  <details>
      <summary>개발자측면 : 중복제거를 위한 리액트 모듈 인덱스와 컨테이터 컴포넌트로서의 커스텀 훅 모듈화 </summary>
      <hr/>
      내용이 들어갑니다.
      <hr/>
      </details>        
</details> 


