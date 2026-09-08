import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AppShell } from './components/AppShell';

import { LoginPage } from './features/auth/LoginPage';
import { TaskListPage } from './features/tasks/TaskListPage';
import { TaskPage } from './features/tasks/TaskPage';
import { RegisterPage } from './features/auth/RegisterPage';

import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './features/auth/ResetPasswordPage';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        <Route
          path="/tasks"
          element={<TaskListPage />}
        />

        <Route
          path="/tasks/:taskId"
          element={<TaskPage />}
        />

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </AppShell>
  );
}

export default App;