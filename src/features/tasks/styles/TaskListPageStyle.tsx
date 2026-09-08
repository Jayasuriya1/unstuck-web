import styled from 'styled-components';

export const TaskListWrapper = styled.main`
  padding: 48px 0 80px;

  .page-header {
    margin-bottom: 32px;
  }

  .page-title {
    margin: 0;
    font-size: 2rem;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .page-description {
    margin: 8px 0 0;
    color: #73736e;
    line-height: 1.6;
  }

  .card {
    background: white;
    border: 1px solid #e8e8e4;
    border-radius: 16px;
    padding: 24px;
  }

  .empty-state {
    padding: 56px 24px;
    text-align: center;
    color: #73736e;

    .empty-state-title {
      margin: 0;
      color: #252525;
      font-size: 1rem;
      font-weight: 600;
    }

    p {
      margin-top: 6px;
    }
  }

  .dashboard-create {
    margin-bottom: 48px;
  }

  .section-heading {
    margin-bottom: 20px;

    h2 {
      margin: 0;
      font-size: 1.15rem;
      line-height: 1.3;
      letter-spacing: -0.015em;
    }

    .muted {
      margin: 5px 0 0;
      font-size: 0.9rem;
    }
  }

  .muted {
    color: #73736e;
  }

  .task-create-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .form-label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .form-input,
  .form-select {
    width: 100%;
    border: 1px solid #deded9;
    border-radius: 10px;
    background: white;
    padding: 12px 14px;
    color: #252525;
    outline: none;
    transition:
      border-color 120ms ease,
      box-shadow 120ms ease;

    &:focus {
      border-color: #9d9d96;
      box-shadow: 0 0 0 3px rgba(37, 37, 37, 0.06);
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }

  .dashboard-tasks {
    margin-top: 8px;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-card {
    background: white;
    border: 1px solid #e8e8e4;
    border-radius: 16px;
    padding: 20px 22px;
    transition:
      border-color 120ms ease,
      box-shadow 120ms ease,
      transform 120ms ease;

    &:hover {
      border-color: #d9d9d4;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
      transform: translateY(-1px);
    }
  }

  .task-card-main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }

  .task-card-title {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 650;
    line-height: 1.4;
    letter-spacing: -0.015em;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  .task-card-description {
    margin: 6px 0 0;
    color: #73736e;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .task-card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;

    span {
      padding: 5px 9px;
      border-radius: 999px;
      background: #f3f3ef;
      color: #73736e;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  .task-card-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;

    .button {
      font-size: 0.85rem;
      padding: 9px 13px;
    }
  }

  .button {
    border: 0;
    border-radius: 10px;
    padding: 11px 18px;
    font-weight: 600;
    transition:
      transform 120ms ease,
      opacity 120ms ease,
      background 120ms ease;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }

  .button-primary {
    background: #252525;
    color: white;

    &:hover:not(:disabled) {
      background: #111111;
    }
  }

  .button-secondary {
    background: #ecece8;
    color: #252525;

    &:hover:not(:disabled) {
      background: #e2e2de;
    }
  }

  .button-danger {
    background: #f3e5e3;
    color: #9b4038;
  }

  @media (max-width: 640px) {
    padding-top: 32px;

    .page-title {
      font-size: 1.65rem;
    }

    .card {
      padding: 18px;
    }

    .task-card {
      padding: 18px;
    }

    .task-card-main {
      flex-direction: column;
      gap: 14px;
    }

    .task-card-meta {
      align-self: flex-start;
    }

    .task-card-actions {
      width: 100%;
      flex-wrap: wrap;

      .button {
        flex: 1;
      }
    }

    .form-actions {
      justify-content: stretch;

      .button {
        width: 100%;
      }
    }
  }
`;
