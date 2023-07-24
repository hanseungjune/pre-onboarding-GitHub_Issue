import React, { createContext, useEffect, useRef } from 'react';
import { issuesType, useFetchIssues } from '../hooks/useFetchIssues';

// 컨텍스트 생성
export const IssueContext = createContext({
  issues: [] as issuesType[],
  fetchIssues: () => {},
  loading: true,
  error: false,
});

// 이슈를 가져오는 함수와 이슈 상태를 관리
export const IssueProvider = ({ children }: any) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const perPage = 12;
  const { issues, page, fetchIssues, loading, error } = useFetchIssues(perPage);

  // Intersection Observer API를 활용하여 스크롤이 페이지 하단에 도달했을 때 새로운 이슈를 가져오는 함수입니다.
  const handleIntersection = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetchIssues();
    }
  };

  // 컴포넌트가 마운트될 때 이 함수를 실행하여 교차점 관찰을 시작합니다.
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    // 교차점 관찰 시작
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // 컴포넌트가 언마운트될 때 교차점 관찰을 중지합니다.
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [page]);

  // 이슈 프로바이더가 children 요소와 교차점 요소를 렌더링합니다.
  return (
    <IssueContext.Provider value={{ issues, fetchIssues, loading, error }}>
      {children}
      <div ref={sentinelRef} style={{ height: '10px' }} />
    </IssueContext.Provider>
  );
};
