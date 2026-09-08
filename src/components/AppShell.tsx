import type { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import type { RootState } from '../app/store';

import {
  resetFocus,
} from '../features/focus/focusSlice';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const isFocusMode = useSelector(
    (state: RootState) =>
      state.focus.isFocusMode,
  );

  const token = localStorage.getItem(
    'accessToken',
  );


  function handleLogout() {
    localStorage.removeItem(
      'accessToken',
    );

    queryClient.clear();

    dispatch(resetFocus());

    navigate('/login', {
      replace: true,
    });
  }

  return (
    <div className="app-shell">
      {token && !isFocusMode && (
        <header className="app-header">
          <div className="app-container app-header-inner">
            <div className="app-logo">
              unstuck
            </div>

            <button
              type="button"
              className="header-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
      )}

      <div className="app-container">
        {children}
      </div>
    </div>
  );
}