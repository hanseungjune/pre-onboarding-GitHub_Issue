import { useContext } from 'react';
import IssueContent from '../components/IssueContent';
import IssueImg from '../components/IssueImg';
import { IssueContext, issuesType } from '../api/IssueContext';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';

export const renderIssue = (issue: issuesType, index: number) => {
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
    return <IssueImg key={`${issue.src}-${index}`} src={issue.src} />;
  }
};

const Issue = () => {
  const { issues, loading, error } = useContext(IssueContext);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorScreen />;
  }

  return <>{issues.map(renderIssue)}</>;
};

export default Issue;
