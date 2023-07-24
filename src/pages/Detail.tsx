import IssueContent from '../components/IssueContent';
import { styled } from 'styled-components';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { IssueDetailContext } from '../api/IssueDetailContext';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import 'github-markdown-css';

const IssueDetailBodyStyle = styled.div`
  width: 75vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #c3e0f4;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #5391b4;
  margin-bottom: 5%;
  padding: 5%;

  & > div {
    margin-bottom: 1%;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { issueDetail, loading, error, fetchIssueDetail } =
    useContext(IssueDetailContext);

  useEffect(() => {
    if (id) {
      fetchIssueDetail(id);
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div>
      <IssueContent
        id={issueDetail.number}
        title={issueDetail.title}
        user={issueDetail.login}
        updateAt={issueDetail.updated_at}
        comments={issueDetail.comments}
        img={issueDetail.avatar_url}
      />
      <IssueDetailBodyStyle className="markdown-body">
        <ReactMarkdown>{issueDetail.body || ''}</ReactMarkdown>
      </IssueDetailBodyStyle>
    </div>
  );
};
export default Detail;
