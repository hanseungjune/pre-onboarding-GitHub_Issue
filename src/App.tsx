import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Issue from './pages/Issue';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { IssueProvider } from './api/IssueContext';
import { IssueDetailProvider } from './api/IssueDetailContext';
export const API_URL = `https://api.github.com`;

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
