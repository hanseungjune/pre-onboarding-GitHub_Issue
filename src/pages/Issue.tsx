import { useContext } from 'react';
import IssueContent from '../components/IssueContent';
import IssueImg from '../components/IssueImg';
import { IssueContext } from '../api/IssueContext';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';

const Issue = () => {
  const { issues, loading, error } = useContext(IssueContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      {issues.map((issue, index) => {
        if (issue.state !== 'img') {
          return (
            <IssueContent
              key={issue.id}
              id={issue.id}
              title={issue.title}
              user={issue.user}
              updateAt={issue.updated_at}
              comments={issue.comments}
            />
          );
        } else {
          return <IssueImg key={index} src={issue.src} />;
        }
      })}
    </>
  );
};

export default Issue;
