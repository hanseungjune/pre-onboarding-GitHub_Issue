import { useState } from 'react';
import { formatDate } from './useFetchIssues';

export interface fetchIssueType {
  avatar_url?: string | undefined;
  number?: number | null | undefined;
  title?: string | null | undefined;
  login?: string | null | undefined;
  updated_at?: string | null | undefined;
  comments?: number | undefined;
  body?: string | null | undefined;
}

export const useFetchDetail = () => {
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

  const fetchIssueDetail = async (id: string) => {
    setLoading(true);
    try {
      if ((process.env.REACT_APP_GITHUB_API_URL || '') && id && accessToken) {
        const response = await fetch(
          `${
            process.env.REACT_APP_GITHUB_API_URL || ''
          }/repos/facebook/react/issues/${id}`,
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
          updated_at: formatDate(data.updated_at),
          comments: data.comments,
          body: data.body,
        };
        setIssueDetail(item);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { issueDetail, loading, error, fetchIssueDetail };
};
