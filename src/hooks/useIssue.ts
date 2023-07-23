import { useContext } from 'react';
import { IssueContext } from '../api/IssueContext';

export const useIssues = () => {
  const { issues, loading, error } = useContext(IssueContext);

  return { issues, loading, error };
};
