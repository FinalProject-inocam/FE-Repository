import React from 'react';
import * as SC from '../components';
import { mainLogoRow } from '../assets';
import { useAdmin } from '../hooks/admin';
import { Outlet } from 'react-router-dom';

export const AdminRouter: React.FC = () => {
  const {currentPage, AdminNaList, onNavigate} = useAdmin()

  return (
    <SC.GridBox $gtc='150px 1fr'>
      <div>
        <SC.AdminNav>
          <SC.FlexBox $fd='column' $gap={10} onClick={onNavigate({ url: '/' })}>
            <SC.FigureObjectFitImg width={"90px"} height={"61px"} src={mainLogoRow} alt="mainLogo" />
            <SC.CustomH3 $color="gray2" $size={0.75} children="관리자페이지" />
          </SC.FlexBox>
          <SC.FlexBox $fd='column' style={{ marginTop: "50px" }}>
            {AdminNaList.map(([title, navigate, state]) => (
              <SC.AdminNavLayout key={navigate} $fd='column' $state={currentPage === state}>
                <SC.AdminNavInnerFlex>
                  <div className='top' />
                  <div className='currentLogation' />
                </SC.AdminNavInnerFlex>
                <h3 onClick={onNavigate({ url: navigate })} children={title} />
                <SC.AdminNavInnerFlex>
                  <div className='bottom' />
                  <div className='currentLogation' />
                </SC.AdminNavInnerFlex>
              </SC.AdminNavLayout>
            ))}
          </SC.FlexBox>
        </SC.AdminNav>
      </div>
      <Outlet />
    </SC.GridBox>
  );
};