import { createContext } from 'react';
import { fetchIssueType, useFetchDetail } from '../hooks/useFetchDetail';

// 컨텍스트 생성
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

// 이슈의 세부 내용 상태를 관리
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
