import { Outlet } from 'react-router-dom';
import Header from './Header';
import { styled } from 'styled-components';

const IssueContainerStyle = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <IssueContainerStyle>
        <Outlet />
      </IssueContainerStyle>
    </>
  );
};

export default Layout;
