import { createContext, useEffect, useRef, useState } from 'react';

export interface issuesType {
  state?: string | null;
  id?: number;
  title?: string | null;
  user?: string | null;
  updated_at?: string | null;
  comments?: number;
  src?: string | undefined;
}

export const IssueContext = createContext({
  issues: [] as issuesType[],
  fetchIssue: () => {},
  loading: true,
  error: false,
});

export const IssueProvider = ({ children }: any) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [issues, setIssues] = useState<issuesType[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 24;
  const accessToken: string = process.env.REACT_APP_GITHUB_ACCESS_TOKEN || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleIntersection = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetchIssue();
    }
  };

  const fetchIssue = async () => {
    setLoading(true);
    try {
      if (process.env.REACT_APP_GITHUB_API_URL && accessToken) {
        const items: issuesType[] = []; // 이슈 데이터를 저장할 지역 변수
        const response = await fetch(
          `${process.env.REACT_APP_GITHUB_API_URL}/repos/facebook/react/issues?page=${page}&per_page=${perPage}&sort=comments`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data: any[] = await response.json();
        // 이슈번호, 이슈제목, 작성자, 작성일, 코멘트수, 이슈상태
        for (let i = 0; i < data.length; i++) {
          items.push({
            state: data[i].state,
            id: data[i].number,
            title: data[i].title,
            user: data[i].user.login,
            updated_at: `${new Date(data[i].updated_at).getFullYear()}년 ${
              new Date(data[i].updated_at).getMonth() + 1
            }월 ${new Date(data[i].updated_at).getDate()}일`,
            comments: data[i].comments,
          });
          // 5번째 되면 넣어주기
          if (i % 4 === 3) {
            items.push({
              state: 'img',
              src: `https://freight.cargo.site/t/original/i/4578b55ce1658ae2b74841d9148db68944f8461b1d393d29101a372fa80bef12/Logotype_Before_after.jpg`,
            });
          }
        }
        setIssues(prevIssues => [...prevIssues, ...items]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current); // 교차점 관찰 시작
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current); // 컴포넌트가 언마운트될 때 교차점 관찰 종료
      }
    };
  }, [page]);

  return (
    <IssueContext.Provider value={{ issues, fetchIssue, loading, error }}>
      {children}
      <div ref={sentinelRef} style={{ height: '10px' }} />
    </IssueContext.Provider>
  );
};
