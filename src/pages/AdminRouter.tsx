import React from 'react';
import { Outlet } from 'react-router-dom';
import * as SC from '../components';
import { styled } from 'styled-components';
import { mainLogo } from '../assets';
import { useRouter } from '../hooks';
import { Styled } from '../types';

export const AdminRouter: React.FC = () => {
  const { onNavigate, pathname } = useRouter()
  const currentPage = pathname.split('/').pop()
  console.log(currentPage === "admin")
  console.log(currentPage === "deliverymanagement")
  console.log(currentPage === "civilcomplaintmanagement")
  return (
    <SC.GridBox $gtc='300px 1fr'>
      <div>
        <AdminNav>
          <SC.FlexBox $fd='column' $gap={5} onClick={onNavigate({ url: '/' })}>
            <SC.FigureObjectFitImg width={"179px"} height={"50px"} src={mainLogo} alt="mainLogo" />
            <SC.CustomH3 $color="gray2" $size={1.25} children="관리자페이지" />
          </SC.FlexBox>
          <SC.FlexBox $fd='column' $gap={20} style={{ marginTop: "61px" }}>

            <AdminNavLayout $fd='column' $state={currentPage === "admin"}>
              <SC.CustomH3 onClick={onNavigate({ url: '/admin' })} $color={currentPage === "admin" ? "white" : "lightgray"} $size={1.25} children="대시보드" />
              <div className='bottomLine' />
            </AdminNavLayout>

            <AdminNavLayout $fd='column' $state={currentPage === "deliverymanagement"}>
              <SC.CustomH3 onClick={onNavigate({ url: 'deliverymanagement' })} $color={currentPage === "deliverymanagement" ? "white" : "lightgray"} $size={1.25} children="출고관리" />
              <div className='bottomLine' />
            </AdminNavLayout>

            <AdminNavLayout $fd='column' $state={currentPage === "civilcomplaintmanagement"}>
              <SC.CustomH3 onClick={onNavigate({ url: 'civilcomplaintmanagement' })} $color={currentPage === "civilcomplaintmanagement" ? "white" : "lightgray"} $size={1.25} children="민원관리" />
              <div className='bottomLine' />
            </AdminNavLayout>

          </SC.FlexBox>
        </AdminNav>
      </div>
      <Outlet />
    </SC.GridBox>
  );
};


const AdminNav = styled.nav`
  height:100vh;
  padding: 35px 0;
  background-color: ${({ theme }) => theme.color.adminNav};
  position: sticky;
  top: 0;
`

const AdminNavLayout = styled.div<Partial<Styled>>`
  ${SC.Flex}
  .bottomLine {
        position: relative;
        top: 5px;
        margin: 0 auto;
        border-radius: 50px;
        width: ${({$state}) => $state ? "100px" : 0 };
        visibility: ${({$state}) => $state ? "visible" : "hidden" };
        border: 1px solid white;
        transition: all 0.2s linear;
        }

  &:hover {
    .bottomLine {
      width: 100px;
      visibility: visible;
    }
  }
`
