import React from "react";
import * as SC from "../css";
import { useLogout, useMainHeader } from "../../hooks";

export const MoblieSiderbar: React.FC<{ state: boolean; setState: any }> = ({
  state,
  setState,
}) => {
  const { sideBarNav, authNav, onNaigateSidebarToggle, pathname } =
    useMainHeader(setState);
  const { sub, onLogout } = useLogout(setState);

  return (
    <SC.MSideBar $state={state}>
      <SC.FlexBox $fd="column">
        <SC.RoutesArea>
          <SC.MSideNav
            children="home"
            onClick={onNaigateSidebarToggle({ url: "/" })}
          />
          {sideBarNav.map((nav: string[]) => (
            <SC.MSideNav
              key={nav[0]}
              children={nav[0]}
              onClick={onNaigateSidebarToggle({ url: nav[1] })}
            />
          ))}
        </SC.RoutesArea>
        <SC.AuthArea>
          {!!!sub
            ? authNav.noPermission.map((nav: string[], idx: number) =>
                idx === 0 ? (
                  <AuthAreaInner
                    key={idx}
                    idx={idx}
                    nav={nav}
                    onClick={onNaigateSidebarToggle({
                      url: nav[2],
                      opts: { state: pathname },
                    })}
                  />
                ) : (
                  <AuthAreaInner
                    key={idx}
                    idx={idx}
                    nav={nav}
                    onClick={onNaigateSidebarToggle({
                      url: nav[2],
                      opts: { state: pathname },
                    })}
                  />
                )
              )
            : sub === "E002"
            ? authNav.users.map((nav: string[], idx: number) =>
                idx === 0 ? (
                  <AuthAreaInner
                    key={idx}
                    idx={idx}
                    nav={nav}
                    onClick={onNaigateSidebarToggle({ url: nav[2] })}
                  />
                ) : (
                  <AuthAreaInner
                    key={idx}
                    idx={idx}
                    nav={nav}
                    onClick={onLogout}
                  />
                )
              )
            : authNav.admin.map((nav: string[], idx: number) =>
                idx === 0 ? (
                  <AuthAreaInner
                    key={idx}
                    idx={idx}
                    nav={nav}
                    onClick={onNaigateSidebarToggle({ url: nav[1] })}
                  />
                ) : (
                  <AuthAreaInner
                    key={idx}
                    idx={idx}
                    nav={nav}
                    onClick={onLogout}
                  />
                )
              )}
        </SC.AuthArea>
      </SC.FlexBox>
      <SC.FooterArea>
        <SC.FlexBox $gap={30}>
          <SC.FooterP>T. +82.2-0000-0000</SC.FooterP>
          <SC.FooterP>E. info@innocam.com</SC.FooterP>
        </SC.FlexBox>
        <SC.CopyRigte>
          COPYRIGHT ⓒ ENOCAMMOTORS.ALL RIGHTS RESERVED
        </SC.CopyRigte>
      </SC.FooterArea>
    </SC.MSideBar>
  );
};

const AuthAreaInner: React.FC<{
  idx: number;
  nav: string[];
  onClick?: any;
}> = ({ idx, nav: [kor, eng], onClick }) => {
  return (
    <SC.AuthAreaNav
      $color={idx === 0 ? "blue" : "darkgray"}
      onClick={onClick}
    >
      <p>{kor}</p>
      <p>{eng}</p>
    </SC.AuthAreaNav>
  );
};
