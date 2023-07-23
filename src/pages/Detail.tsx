import { useContext, useEffect, useState } from 'react';
import IssueContent from '../components/IssueContent';
import { styled } from 'styled-components';
import { IssueDetailContext } from '../api/IssueDetailContext';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import { useParams } from 'react-router-dom';

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
  const [text, setText] = useState<string[] | null | undefined>([]);
  const { issueDetail, loading, error, fetchIssueDetail } =
    useContext(IssueDetailContext);

  useEffect(() => {
    if (id) {
      fetchIssueDetail(id);
    }
  }, [id]);

  useEffect(() => {
    const bodySplit = issueDetail?.body?.split('\n');
    setText(bodySplit || []);
  }, [issueDetail.body]);

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
      <IssueDetailBodyStyle>
        {text?.map((content: string, idx: number) => {
          const firstWord = content.split(' ')[0];
          const remainingContent = content.substring(firstWord.length).trim();
          let headingLevel = 0;
          if (
            firstWord === '#' ||
            firstWord === '##' ||
            firstWord === '###' ||
            firstWord === '####' ||
            firstWord === '#####' ||
            firstWord === '#######'
          ) {
            headingLevel = firstWord.length;
          }
          return (
            <div
              key={idx}
              style={{
                fontSize:
                  headingLevel !== 0 ? `${24 - headingLevel * 2}px` : 'inherit',
                fontWeight:
                  headingLevel !== 0 ? 500 + headingLevel * 100 : 'normal',
              }}
            >
              {remainingContent}
            </div>
          );
        })}
      </IssueDetailBodyStyle>
    </div>
  );
};
export default Detail;
