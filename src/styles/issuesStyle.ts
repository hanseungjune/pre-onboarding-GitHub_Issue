import { styled } from 'styled-components';

export const IssueDivStyle = styled.div`
  width: 75vw;
  height: 15vh;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #5391b4;
  margin-bottom: 1%;
  cursor: pointer;

  & > div:nth-child(1) {
    width: 85%;
    height: 90%;
    margin-right: 1%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div:nth-child(1) {
      width: 95%;
      height: 49%;
      margin: 1% 2%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > span:nth-child(1) {
        display: block;
        margin-right: 3%;
        font-size: 0.75rem;
        font-weight: 900;
        color: #ffffff;
      }

      & > span:nth-child(2) {
        display: block;
        margin-right: 3%;
        margin-top: 1%;
        font-size: 1.2rem;
        font-weight: 900;
        color: #ffffff;
      }
    }

    & > div:nth-child(2) {
      width: 95%;
      height: 20%;
      margin: 1% 5%;
      display: flex;

      & > span:nth-child(1) {
        display: block;
        margin-right: 3%;
        font-size: 1rem;
        font-weight: 900;
        color: #ffffff;
      }

      & > span:nth-child(2) {
        display: block;
        margin-right: 3%;
        font-size: 1rem;
        font-weight: 900;
        color: #ffffff;
      }
    }
  }

  & > div:nth-child(2) {
    width: 10%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 900;
    color: #ffffff;

    & > span:nth-child(1) {
      display: block;
      margin-bottom: 12%;
    }

    & > span:nth-child(2) {
      display: block;
    }
  }
`;

export const IssueDetailDivStyle = styled.div`
  width: 75vw;
  height: 15vh;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  background-color: #000000;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #5391b4;
  margin-bottom: 1%;
  padding-left: 2%;

  & > div:nth-child(1) {
    width: 100px;
    height: 100px;
    margin-right: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }

  & > div:nth-child(2) {
    width: 74%;
    height: 90%;
    margin-right: 1%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div:nth-child(1) {
      width: 95%;
      height: 49%;
      margin: 1% 2%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > span:nth-child(1) {
        display: block;
        margin-right: 3%;
        font-size: 0.75rem;
        font-weight: 900;
        color: #ffffff;
      }

      & > span:nth-child(2) {
        display: block;
        margin-right: 3%;
        margin-top: 1%;
        font-size: 1.2rem;
        font-weight: 900;
        color: #ffffff;
      }
    }

    & > div:nth-child(2) {
      width: 95%;
      height: 20%;
      margin: 1% 5%;
      display: flex;

      & > span:nth-child(1) {
        display: block;
        margin-right: 3%;
        font-size: 1rem;
        font-weight: 900;
        color: #ffffff;
      }

      & > span:nth-child(2) {
        display: block;
        margin-right: 3%;
        font-size: 1rem;
        font-weight: 900;
        color: #ffffff;
      }
    }
  }

  & > div:nth-child(3) {
    width: 10%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 900;
    color: #ffffff;

    & > span:nth-child(1) {
      display: block;
      margin-bottom: 12%;
    }

    & > span:nth-child(2) {
      display: block;
    }
  }
`;

export const IssueImgDivStyle = styled.div`
  width: 75vw;
  height: 15vh;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c3e0f4;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #5391b4;
  margin-bottom: 1%;
`;

export const IssueImgStyle = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`;
