import { useState } from 'react';

export interface issuesType {
  state?: string | null;
  id?: number;
  title?: string | null;
  user?: string | null;
  updated_at?: string | null;
  comments?: number;
  src?: string | undefined;
}

export interface formatIssuesDataType {
  state: string;
  number: number;
  title: string;
  user: {
    login: string;
  };
  updated_at: string;
  comments: string;
}

// 페이지와 페이지당 이슈 수를 인자로 받아,
// 이슈를 가져와 상태를 설정하는 Custom Hook
export const useFetchIssues = (perPage: number) => {
  const [issues, setIssues] = useState<issuesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  // 페이지, 이슈를 상태 관리
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await fetchIssueFromGithub(page, perPage);
      const formattedData: any[] = formatIssuesData(response);
      setIssues((prev: issuesType[]) => [...prev, ...formattedData]);
      setPage(prevPage => prevPage + 1);
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { issues, page, fetchIssues, loading, error };
};

// 깃허브에서 이슈 HTTP GET 요청
export const fetchIssueFromGithub = async (page: number, perPage: number) => {
  const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN || '';
  const response = await fetch(
    `${process.env.REACT_APP_GITHUB_API_URL}/repos/facebook/react/issues?page=${page}&per_page=${perPage}&sort=comments`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

// 날짜를 형식에 맞게 포맷팅
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// 이슈 데이터를 필요한 형식으로 전처리하는 함수
export const formatIssuesData = (data: formatIssuesDataType[]) => {
  const items = [];
  for (let i = 0; i < data.length; i++) {
    items.push({
      state: data[i].state,
      id: data[i].number,
      title: data[i].title,
      user: data[i].user.login,
      updated_at: formatDate(data[i].updated_at),
      comments: data[i].comments,
    });
    if (i % 4 === 3) {
      items.push({
        state: 'img',
        src: `https://freight.cargo.site/t/original/i/4578b55ce1658ae2b74841d9148db68944f8461b1d393d29101a372fa80bef12/Logotype_Before_after.jpg`,
      });
    }
  }
  return items;
};
