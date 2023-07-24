import { useContext, useEffect } from 'react';
import { IssueDetailContext } from '../api/IssueDetailContext';

export const useIssueDetail = (id: string | undefined) => {
  const { issueDetail, loading, error, fetchIssueDetail } =
    useContext(IssueDetailContext);

  useEffect(() => {
    if (id) {
      fetchIssueDetail(id);
    }
  }, [id]);

  return { issueDetail, loading, error };
};
