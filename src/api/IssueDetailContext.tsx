import { createContext, useEffect, useState } from 'react';
import { API_URL } from '../App';
import { useParams } from 'react-router-dom';

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
});

export interface fetchIssueType {
  avatar_url?: string | undefined;
  number?: number | null | undefined;
  title?: string | null | undefined;
  login?: string | null | undefined;
  updated_at?: string | null | undefined;
  comments?: number | undefined;
  body?: string | null | undefined;
}

export const IssueDetailProvider = ({ children }: any) => {
  const { id } = useParams();
  const [issueDetail, setIssueDetail] = useState<fetchIssueType>({
    avatar_url: undefined,
    number: null,
    title: null,
    login: null,
    updated_at: null,
    comments: undefined,
    body: null,
  });
  const accessToken: string = process.env.REACT_APP_GITHUB_ACCESS_TOKEN || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchIssueDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/repos/facebook/react/issues/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      let item = {
        avatar_url: data.user?.avatar_url,
        number: data.number,
        title: data.title,
        login: data.user?.login,
        updated_at: `${new Date(data.updated_at).getFullYear()}년 ${
          new Date(data.updated_at).getMonth() + 1
        }월 ${new Date(data.updated_at).getDay()}일`,
        comments: data.comments,
        body: data.body,
      };
      setIssueDetail(item);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIssueDetail();
  }, []);

  return (
    <IssueDetailContext.Provider value={{ issueDetail, loading, error }}>
      {children}
    </IssueDetailContext.Provider>
  );
};
