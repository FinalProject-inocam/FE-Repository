# 최종 프로젝트 파일 명 :: 
[yarn.lock - 관련 에러](https://github.com/mebjas/html5-qrcode/issues/396)

## 리팩토링 
<details>
<summary>1차 리팩토링 - 8월 1일</summary>

1. 코드유지보스 및 모듈의 재사용성 개선 : `"리엑트 모듈 인덱스"` 또는 `"바렐(rel) 모듈 인덱스"` 패턴

    <details>
    <summary>코드 살펴보기 </summary>
    
    ```tsx
    import Button from './components/community';
    import Modal from './components/css';
    import Header from './components/atom';
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
  <summary>2차 리팩토링 - 8월 11일</summary>

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
  

</details>

