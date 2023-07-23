import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
