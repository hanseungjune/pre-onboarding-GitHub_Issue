import { IssueProvider } from './api/IssueContext';
import { IssueDetailProvider } from './api/IssueDetailContext';
import GlobalStyle from './GlobalStyle';
import Loading from './components/Loading';
import { Suspense } from 'react';
import RouterComponent from './router';
import Header from './components/Header';

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
