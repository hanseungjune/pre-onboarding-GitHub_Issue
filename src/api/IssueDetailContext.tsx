import { createContext } from 'react';
import { fetchIssueType, useFetchDetail } from '../hooks/useFetchDetail';

export const IssueDetailContext = createContext({
  issueDetail: {
    avatar_url: undefined,
    number: null,
    title: null,
    login: null,
    updated_at: null,
    comments: undefined,
    body: null,
  } as fetchIssueType,
  loading: true,
  error: false,
  fetchIssueDetail: (id: string) => {},
});

export const IssueDetailProvider = ({ children }: any) => {
  const { issueDetail, loading, error, fetchIssueDetail } = useFetchDetail();

  return (
    <IssueDetailContext.Provider
      value={{ issueDetail, loading, error, fetchIssueDetail }}
    >
      {children}
    </IssueDetailContext.Provider>
  );
};
