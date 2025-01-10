import { HashRouter as Router, Routes, Route } from 'react-router';
import App from './App';
import { Login, RequireAuth } from './pages';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}
