import styled from 'styled-components';

const ErrorScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  color: #dc3545;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  font-size: 1.25rem;
  color: #6c757d;
`;

const ErrorScreen = () => {
  return (
    <ErrorScreenContainer>
      <ErrorTitle>Oops, something went wrong.</ErrorTitle>
      <ErrorText>
        We are sorry but we could not complete your request. Please try again
        later.
      </ErrorText>
    </ErrorScreenContainer>
  );
};

export default ErrorScreen;
