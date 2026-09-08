import styled from 'styled-components';

export const TaskPageWrapper = styled.main`
  padding: 48px 0 80px;
  max-width: 900px;
  margin: 0 auto;

  .back-link {
    display: inline-block;
    margin-bottom: 28px;
    color: #73736e;
    font-size: 0.9rem;
    font-weight: 600;

    &:hover {
      color: #252525;
    }
  }

  .task-hero {
    margin-bottom: 52px;
  }

  .task-hero-content {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
  }

  .eyebrow {
    margin: 0 0 8px;
    color: #8a8a84;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .task-page-title {
    margin: 0;
    max-width: 700px;
    font-size: 2.4rem;
    line-height: 1.15;
    letter-spacing: -0.04em;
  }

  .task-page-description {
    max-width: 650px;
    margin: 12px 0 0;
    color: #73736e;
    font-size: 1rem;
    line-height: 1.65;
  }

  .task-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;

    span {
      padding: 6px 10px;
      border-radius: 999px;
      background: #f0f0ec;
      color: #73736e;
      font-size: 0.75rem;
      font-weight: 600;
    }
  }

  .task-hero-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex-shrink: 0;

    .button {
      white-space: nowrap;
    }
  }

  .focus-button {
    flex-shrink: 0;
    padding: 13px 20px;
  }

  .task-section {
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

  .page-state {
    padding: 48px 24px;
    text-align: center;
  }

  .page-state-title {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.4;
    letter-spacing: -0.015em;
  }

  .page-state-description {
    max-width: 420px;
    margin: 8px auto 0;
    color: #73736e;
    line-height: 1.6;
  }

  .page-state-action {
    margin-top: 20px;
  }

  .add-step-card {
    max-width: 700px;
  }

  .add-step-form {
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

  .form-input {
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

  .task-step-tree {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .task-step-node {
    width: 100%;
  }

  .task-step-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 0;
    border-bottom: 1px solid #eeeeea;
  }

  .task-step-expand {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #73736e;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: #f2f2ee;
      color: #252525;
    }
  }

  .task-step-expand-placeholder {
    width: 28px;
    flex-shrink: 0;
  }

  .task-step-content {
    flex: 1;
    min-width: 0;
    padding: 2px 0;
  }

  .task-step-title {
    color: #252525;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .task-step-description {
    margin-top: 4px;
    color: #73736e;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .task-step-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 7px;
    color: #8a8a84;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .task-step-status {
    display: inline-flex;
    align-items: center;
    padding: 3px 7px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  .task-step-status-pending {
    background: #f1f1ed;
    color: #73736e;
  }

  .task-step-status-active {
    background: #e9f0e8;
    color: #4f684d;
  }

  .task-step-status-completed {
    background: #edf1ed;
    color: #647064;
  }

  .task-step-status-parked {
    background: #f3eee5;
    color: #806b48;
  }

  .task-step-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 6px;
    flex-shrink: 0;
  }

  .task-step-action {
    min-height: 32px;
    padding: 6px 10px;
    border: 1px solid #deded9;
    border-radius: 7px;
    background: white;
    color: #555550;
    font-size: 0.75rem;
    font-weight: 600;
    transition:
      background 120ms ease,
      border-color 120ms ease,
      color 120ms ease,
      transform 120ms ease;

    &:hover {
      background: #f5f5f2;
      border-color: #cfcfc9;
      color: #252525;
      transform: translateY(-1px);
    }
  }

  .task-step-action-ai {
    border-color: #d8d8d2;
    background: #f3f3ef;
    color: #4d4d48;

    &:hover {
      background: #e9e9e4;
    }
  }

  .task-step-action-danger {
    color: #9b4038;

    &:hover {
      border-color: #e2c9c6;
      background: #f8eeec;
      color: #8b342d;
    }
  }

  .task-step-children {
    margin-left: 18px;
    padding-left: 22px;
    border-left: 1px solid #e4e4df;
  }

  .time-insight {
    padding: 24px;
  }

  .time-insight-summary {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 20px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 16px;
      border: 1px solid #eeeeea;
      border-radius: 10px;
      background: #fafaf8;
    }

    strong {
      color: #252525;
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  .time-insight-label {
    color: #8a8a84;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .time-insight-message {
    margin-top: 16px;
    color: #555550;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  @media (max-width: 760px) {
    .task-step-row {
      flex-wrap: wrap;
    }

    .task-step-content {
      flex-basis: calc(100% - 38px);
    }

    .task-step-actions {
      width: 100%;
      margin-left: 38px;
      justify-content: flex-start;
    }

    .task-step-action {
      min-height: 40px;
    }
  }

  @media (max-width: 700px) {
    .task-hero-content {
      align-items: stretch;
      flex-direction: column;
    }

    .task-page-title {
      font-size: 2rem;
    }

    .focus-button {
      width: 100%;
    }

    .task-hero-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;

      .button {
        width: 100%;
      }
    }
  }

  @media (max-width: 640px) {
    padding-top: 32px;

    .task-hero {
      margin-bottom: 40px;
    }

    .task-page-description {
      font-size: 0.95rem;
    }

    .task-meta {
      flex-wrap: wrap;
    }

    .task-section {
      margin-bottom: 40px;
    }

    .card {
      padding: 18px;
    }
  }

  @media (max-width: 520px) {
    .time-insight-summary {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .task-page-title {
      font-size: 1.75rem;
    }

    .task-step-children {
      margin-left: 10px;
      padding-left: 14px;
    }

    .task-step-actions {
      margin-left: 0;
    }

    .task-step-action {
      flex: 1;
    }
  }
`;
