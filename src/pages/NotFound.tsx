import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const ContentWrapper = styled.div`
  text-align: center;

  h1 {
    font-size: 72px;
    color: #434343;
  }

  p {
    font-size: 24px;
    color: #434343;
  }
`;

const BackToHomeButton = styled(Link)`
  display: inline-block;
  margin-top: 24px;
  padding: 10px 20px;
  border: 2px solid #434343;
  border-radius: 5px;
  color: #434343;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: #434343;
    color: #f5f5f5;
  }
`;

const NotFound = () => (
  <NotFoundWrapper>
    <ContentWrapper>
      <h1>404</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <BackToHomeButton to="/issue">Back to Home</BackToHomeButton>
    </ContentWrapper>
  </NotFoundWrapper>
);

export default NotFound;
