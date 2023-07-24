# ToyPJT - GitHub Issue Web Page

👆🏻 제목을 클릭하면 배포된 사이트를 확인하실 수 있습니다.

<br/>

## 🗓️ 기간

- 2023년 7월 11일 ~ 2023년 07월 14일

## 🧭 목적

- [GitHub REST API](https://docs.github.com/en/rest)로 GitHub Issue 페이지 구현하기
- 무한 스크롤을 사용해서 HTTPS 요청 해보기

<br/>

## ✅ Task

### ❗필수 요구 사항

- ⭕ 이슈 목록 및 상세 화면 기능 구현
- ⭕ Context API를 활용한 API 연동
- ⭕ 데이터 요청 중 로딩 표시
- ⭕ 에러 화면 구현
- ⭕ 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

### ❗범위

1. 이슈 목록 화면

   - ⭕ 이슈 목록 가져오기 API 활용
   - ⭕ open 상태의 이슈 중 코멘트가 많은 순으로 정렬
   - ⭕ 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
   - ⭕ 다섯번째 셀마다 광고 이미지 출력
   - ⭕ 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

2. 이슈 상세 화면

   - ⭕ 이슈의 상세 내용 표시
   - ⭕ ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시

3. 공통 헤더

   - ⭕ 두 페이지는 공통 헤더를 공유합니다.
   - ⭕ 헤더에는 Organization Name / Repository Name이 표시됩니다.

<br/>

## 💡 진행방식

1.  컨벤션을 지정하여 [위키](https://github.com/hanseungjune/pre-onboarding-11th-3-3/wiki/Editing--Convention)에 정리해 두었습니다.

2.  구현을 우선순위로하고, 트러블 슈팅이나 리팩토링 할 부분이 있다면, 추가적으로 진행할 예정입니다.

<br/>

## 🎖️ Members

<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/92035406?v=4"  alt=""/>
        FE.<br/>
        <a href="https://github.com/hanseungjune">
          <img src="https://img.shields.io/badge/한승준-000000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>

<br/>

## 🛠️ Stacks

![react](https://user-images.githubusercontent.com/123078739/234895132-18ab503a-fcc7-486d-b89a-cb0cc1f7796b.svg) ![eslint](https://user-images.githubusercontent.com/123078739/234895191-c1198a7b-9e2e-499a-8e61-c3b87bf8e2c2.svg)
![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) ![typescript](https://user-images.githubusercontent.com/123078739/234895162-42f905c6-765d-44d2-bcb1-b011286ef6b2.svg) ![styledcomponents](https://user-images.githubusercontent.com/123078739/234895185-7fd6c334-faca-4520-8551-2f20b32f085e.svg)

<br/>

### 📍 기능

- 이슈 목록
- 이슈 상세
- 이슈 목록 인피니티 스크롤

<table border>
  <tr>
    <td><img src="./GitHub Issues Pages.gif" alt="GitHub issue Page"/></td>
  </tr>
  <tr>
    <td align="center">GitHub issue Page</td>
  </tr>
</table>

### 🌳 File Tree

```
📦src
 ┣ 📂api
 ┃ ┣ 📜IssueContext.tsx
 ┃ ┗ 📜IssueDetailContext.tsx
 ┣ 📂components
 ┃ ┣ 📜ErrorScreen.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜IssueContent.tsx
 ┃ ┣ 📜IssueImg.tsx
 ┃ ┣ 📜Layout.tsx
 ┃ ┗ 📜Loading.tsx
 ┣ 📂pages
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Issue.tsx
 ┃ ┗ 📜NotFound.tsx
 ┣ 📂styles
 ┃ ┗ 📜issuesStyle.ts
 ┣ 📜App.tsx
 ┣ 📜GlobalStyle.ts
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

### ✨ GitHub Issues Web Page

#### 💥리팩토링

- Case 01.

  - 라우터

  ```js
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/issue"
          element={
            <IssueProvider>
              <Issue />
            </IssueProvider>
          }
        />
        <Route
          path="/issue/:id"
          element={
            <IssueDetailProvider>
              <Detail />
            </IssueDetailProvider>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  ```

  - 해당코드가 길어지면, App 최상위 컴포넌트의 코드가 복잡성이 너무 높아진다. 그리고 관심사의 분리가 안되어있다고 생각했다. 그래서 router에대한 파일을 따로 만들고 App에 import 하는 방식으로 진행하는게 맞지 않나 하는 생각이 들어서 그런 생각으로 작업했다.

  ```ts
  // 여기서는 페이지 컴포넌트를 레이지 로딩합니다.
  // 해당 컴포넌트가 실제로 필요한 시점에만 로드되도록 하기 위함입니다.
  const Issue = lazy(() => import('./pages/Issue'));
  const Detail = lazy(() => import('./pages/Detail'));
  const NotFound = lazy(() => import('./pages/NotFound'));

  const RouterComponent = () => (
    <Router>
      <Routes>
        <Route index element={<Issue />} />
        <Route path="/issues" element={<Issue />} />
        <Route path="/issues/:id" element={<Detail />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );

  export default RouterComponent;
  ```
  
  React의 lazy는 React 컴포넌트의 코드 분할을 가능하게 하는 기능입니다. 일반적으로 웹 페이지는 처음 로딩될 때 모든 스크립트를 한 번에 다운로드받습니다. 하지만 이런 방식은 페이지가 복잡해지고 커질수록 초기 로딩 속도가 느려집니다.

  lazy를 사용하면 사용자가 실제로 해당 컴포넌트를 보려고 할 때 (예: 특정 라우트에 접근할 때) 해당 컴포넌트의 코드를 로드합니다. 이는 네트워크 사용량을 줄이고 애플리케이션의 초기 로딩 속도를 향상시킵니다.

  ```ts
  function App() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <IssueProvider>
          <IssueDetailProvider>
            <Suspense fallback={<Loading />}>
              <RouterComponent />
            </Suspense>
          </IssueDetailProvider>
        </IssueProvider>
      </>
    );
  }

  export default App;
  ```

  Suspense와 fallback 속성은 React의 코드 분할 기능을 더 잘 활용하도록 도와줍니다.

  Suspense는 어떤 컴포넌트의 렌더링이 지연되는 동안(예: 데이터를 불러오거나, lazy로 코드 분할된 컴포넌트를 불러오는 경우 등) 임시로 다른 컴포넌트를 보여줄 수 있게 합니다. 예를 들어, 아직 로드되지 않은 컴포넌트가 있을 때 로딩 인디케이터를 보여주는 등의 처리를 할 수 있습니다.

  fallback 속성은 Suspense 컴포넌트가 감싸고 있는 컴포넌트들 중 하나라도 아직 준비되지 않았을 때 보여주는 대체 컴포넌트를 지정합니다. 예를 들어, fallback={<Loading />}라고 지정하면 아직 로드되지 않은 컴포넌트가 있을 때 Loading 컴포넌트를 보여줍니다.

- Case 02.

  - Issues && Detail
  
    - Issues
      ```ts
      const Issue = () => {
        const { issues, loading, error } = useContext(IssueContext);

        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <ErrorScreen />;
        }

        return (
          <>
            {issues.map((issue, index) => {
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
            })}
          </>
        );
      };

      export default Issue;
      ```

      해당 코드가 좀 이해하기에는 복잡성이 높다고 생각했고, 관심사의 분리가 제대로 되어있지 않다고 생각하여, 기능을 구현하는 함수는 Custom Hook으로 만들었고, 컴포넌트를 조금 더 세밀하게 쪼갤 수 있어서, 컴포넌트를 하나 더 만들었다.

      ```ts
      export const useIssues = () => {
        const { issues, loading, error } = useContext(IssueContext);

        return { issues, loading, error };
      };
      ```

      Context API의 결과물을 가지고 올 수 있는 것을 Hook으로 따로 빼내서 관심사를 분리 시켜버렸다.

      ```ts
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
      ```

      서브 컴포넌트 파일을 따로 만들어버릴까 하다가 횡단 관심사라는 것이 생각나서, 컴포넌트를 만들어서 UI자체를 분할하되 절차지향으로 컴포넌트를 배치해서 연결성을 보여주는 것이 좋다고 생각하여 이렇게 코드를 작성했다. 그래서 main 컴포넌트인 issues 컴포넌트가 조금 더 가독성이 좋아보였다.

    - Detail
      ```ts
      const Detail = () => {
        const { id } = useParams();
        const [text, setText] = useState<string[] | null | undefined>([]);
        const { issueDetail, loading, error, fetchIssueDetail } =
          useContext(IssueDetailContext);

        useEffect(() => {
          if (id) {
            fetchIssueDetail(id);
          }
        }, [id]);

        useEffect(() => {
          const bodySplit = issueDetail?.body?.split('\n');
          setText(bodySplit || []);
        }, [issueDetail.body]);

        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <ErrorScreen />;
        }

        return (
          <div>
            <IssueContent
              id={issueDetail.number}
              title={issueDetail.title}
              user={issueDetail.login}
              updateAt={issueDetail.updated_at}
              comments={issueDetail.comments}
              img={issueDetail.avatar_url}
            />
            <IssueDetailBodyStyle>
              {text?.map((content: string, idx: number) => {
                const firstWord = content.split(' ')[0];
                const remainingContent = content.substring(firstWord.length).trim();
                let headingLevel = 0;
                if (
                  firstWord === '#' ||
                  firstWord === '##' ||
                  firstWord === '###' ||
                  firstWord === '####' ||
                  firstWord === '#####' ||
                  firstWord === '#######'
                ) {
                  headingLevel = firstWord.length;
                }
                return (
                  <div
                    key={idx}
                    style={{
                      fontSize:
                        headingLevel !== 0 ? `${24 - headingLevel * 2}px` : 'inherit',
                      fontWeight:
                        headingLevel !== 0 ? 500 + headingLevel * 100 : 'normal',
                    }}
                  >
                    {remainingContent}
                  </div>
                );
              })}
            </IssueDetailBodyStyle>
          </div>
        );
      };
      export default Detail;
      ```

      해당 코드 역시 관심사의 분리가 전혀 되어 있지 않다.
      그리고 마크다운 형태의 문자열이기 때문에 해당 부분들은 컴파일하여 브라우저에 나타낼 수 있게 해야할 것으로 보인다.

      ```ts
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
      ```

      Context API의 결과물을 가지고 올 수 있는 것을 Hook으로 따로 빼내서 관심사를 분리 시켜버렸다.

      ```ts
      const Detail = () => {
        const { id } = useParams();
        const { issueDetail, loading, error } = useIssueDetail(id);

        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <ErrorScreen />;
        }

        return (
          <div>
            <IssueContent
              id={issueDetail.number}
              title={issueDetail.title}
              user={issueDetail.login}
              updateAt={issueDetail.updated_at}
              comments={issueDetail.comments}
              img={issueDetail.avatar_url}
            />
            <IssueDetailBodyStyle className="markdown-body">
              <ReactMarkdown>{issueDetail.body || ''}</ReactMarkdown>
            </IssueDetailBodyStyle>
          </div>
        );
      };
      export default Detail;
      ```

      ReactMarkdown 라이브러리를 통해서 issueDetail.body 를 통으로 받아와서 마크다운을 HTML로 파싱하는 작업을 한다.
      그리고 issueDetail에 대한 관심사 분리를 통해서 useIssueDetail라는 Hook을 만들어서 사용하여 export 해온다.

  - Case 03.

    - Context API (IssueContext)

      횡단 관심사에 대한 분리가 되어있지 않아서 Custom Hook과 각종 함수를 통해 관심사 분리를 하였습니다. 

      ```ts
      // 깃허브에서 이슈 HTTP GET 요청
      const fetchIssueFromGithub = async (page: number, perPage: number) => {
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
      ```

      먼저 HTTPS 요청에 대한 관심사 분리를 하였습니다.

      ```ts
      // 날짜를 형식에 맞게 포맷팅
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
      };

      // 이슈 데이터를 필요한 형식으로 전처리하는 함수
      const formatIssuesData = (data: formatIssuesDataType[]) => {
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
      ```

      받아온 data를 포맷팅하여 원하는 형태의 데이터로 변환하였습니다.

      ```ts
      // 페이지와 페이지당 이슈 수를 인자로 받아,
      // 이슈를 가져와 상태를 설정하는 Custom Hook
      const useFetchIssues = (perPage: number) => {
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
      ```

      받아온 데이터를 기반으로 상태관리를 합니다. 
      그리고 프로바이더로 넘겨줍니다.

      ```ts
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
        const perPage = 24;
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
      ```

      Intersection Observer API 기반으로 무한스크롤을 구현하는 프로바이더 코드를 분리하여 관심사 분리를 하고, 횡단 관심사를 유지 할 수 있게 합니다.

    - Context API (IssueDetailContext)

      횡단 관심사에 대한 분리가 되어있지 않아서 Custom Hook을 통해 관심사 분리를 하였습니다. 
      
      ```ts
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
      ```

      useFetchDetail을 통해서 id마다 fetch 할 수 있게 넘겨주고,
      원하는 데이터 형태로 issueDetail을 만들어서 보여준다.

      ```ts
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
      ```

      전역으로 해당 데이터 및 fetch 함수 보내기 위해서 Context API를 활용한다.

<br/>

## ✒️ 회고

<table>
  <thead>
    <tr>
      <th width="50%">좋았던 점</th>
      <th width="50%">아쉬웠던 점</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
      <li>무한스크롤을 예전 프로젝트에서 구현하지 못해서 그냥 Get 요청으로하고, 페이지네이션을 사용했던 적이 있는데, 이번 과제를 통해서 무한 스크롤에 집중해볼 수 있어서 좋았습니다.</li>
      <li>리팩토링을 통해서 관심사의 분리와 Custom Hook에 대해서 깊게 생각해보고 실행했는데, 하고 보니 나중에 유지보수 자체를 하는 것에 되게 편할 것이라고 생각이 들어서 좋았던 것 같다.</li>
      </td>
      <td>
      <li>개인적인 사정으로 과제를 3일 정도 늦게 시작했다. 그래서 거의 하루이틀만에 만들려고 하다보니 퀄리티가 예상보다 조금 떨어졌다고 생각한다.</li>
      <li>원래는 동료학습을 했어야 했는데, 개인적인 사정으로 혼자 과제를 해야하는 입장이라서 조금 아쉬웠다. 다음에는 동료학습에 충실하여 다른 사람들의 코드도 참고하면서 성장하고 싶다.</li>
      </td>
    </tr>
  </tbody>
</table>