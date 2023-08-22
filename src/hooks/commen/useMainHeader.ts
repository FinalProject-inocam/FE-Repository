import { useEffect, useRef, useState } from "react";
import * as Type from "../../types";
import { useRouter } from "../useRouter";

export const useMainHeader = (setState?: Type.SetState): Type.UseMainHeader => {
  const { onNavigate } = useRouter();
  const SplashScreenRef = useRef<HTMLDivElement | null>(null);
  const [hanbagerToggle, setHanbagerToggle] = useState<boolean>(false);

  const [scrolly, setScrolly] = useState<Type.UseHeadScroll>({
    scrolly: 0,
    innerHeight: window.innerHeight,
    preScrolly: false,
    isTop: false,
  });

  const onHanbagerToggle = (): void => {
    setHanbagerToggle((pre) => !pre);
  };

  const sideBarNav = [
    ["Models", "innocar"],
    ["Order", "communitywrite"],
    ["Community", "community"],
    ["Wrapping Shop", "wrapping"],
  ];
  const authNav = {
    noPermission: [
      ["로그인이 필요합니다.", "Login", "login"],
      ["신규회원가입", "Signup", "signup"],
    ],
    users: [
      ["마이페이지", "My Page", "mypage"],
      ["로그아웃", "Log Out"],
    ],
    admin: [
      ["관리자", "Admin Page", "admin"],
      ["로그아웃", "Log Out"],
    ],
  };

  // 01 : 토큰이 없을때 : 로그인이 필요합니다. Login && 신규회워가입 Signup
  // 02 : E0002 일때 : 마이페이지 mypgae && 로그아웃 Log Out
  // 03 : E0001 일때 : 관리자페이지 Admin page && 로그아웃 Logout
  // !!, 그러나 빈객체를 판별해야 하기에 => Object.keys(decode).length === 0

  const onNaigateSidebarToggle =
    ({ url, opts }: Type.Native) =>
    (): void => {
      onNavigate({ url, opts })();
      setState
        ? setState((pre: boolean) => !pre)
        : setHanbagerToggle((pre: boolean) => !pre);
    };

  // SplashScreenRef 아후, 헤더 - setTimeout
  useEffect(() => {
    setTimeout(() => {
      setScrolly({
        ...scrolly,
        scrolly: window.scrollY,
        preScrolly: false,
        isTop: true,
      });
    }, 2600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onSetScrollY = (): any => {
      window.scrollY === 0
        ? setScrolly({
            ...scrolly,
            scrolly: window.scrollY,
            preScrolly: false,
            isTop: true,
          })
        : setScrolly({
            ...scrolly,
            scrolly: window.scrollY,
            preScrolly: scrolly.scrolly > window.scrollY,
            isTop: false,
          });
    };

    window.addEventListener("scroll", () => {
      onSetScrollY();
    });
    window.removeEventListener("scroll", () => {
      onSetScrollY();
    });
  }, [scrolly]);

  // SplashScreenRef - setTimeout
  useEffect(() => {
    setTimeout(() => {
      SplashScreenRef.current && (SplashScreenRef.current.style.opacity = "0");
      SplashScreenRef.current &&
        (SplashScreenRef.current.style.display = "none");
    }, 2500);
    return () => {
      SplashScreenRef.current = null;
    };
  }, []);

  return {
    scrolly,
    SplashScreenRef,
    hanbagerToggle,
    setHanbagerToggle,
    onHanbagerToggle,
    onNaigateSidebarToggle,
    sideBarNav,
    authNav,
    onNavigate,
  };
};
