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

    - Context API

      ```ts
      
      ```