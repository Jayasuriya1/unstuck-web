import styled from 'styled-components';

export const FocusPageWrapper = styled.main`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;

  .focus-container {
    width: 100%;
    max-width: 680px;
  }

  .focus-step {
    text-align: center;
  }

  .focus-progress {
    margin: 0;
    color: #8a8a84;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .focus-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 36px;
  }

  .focus-title {
    max-width: 650px;
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.25rem);
    line-height: 1.12;
    letter-spacing: -0.045em;
    text-wrap: balance;
  }

  .focus-description {
    max-width: 560px;
    margin: 18px 0 0;
    color: #73736e;
    font-size: 1.05rem;
    line-height: 1.65;
    text-wrap: balance;
  }

  .focus-timer {
    margin-top: 42px;
    font-variant-numeric: tabular-nums;
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .focus-timer-over {
    opacity: 0.75;
  }

  .focus-estimate {
    margin: 12px 0 0;
    color: #8a8a84;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .focus-done-button {
    min-width: 160px;
    margin-top: 40px;
    padding: 14px 24px;
    font-size: 1rem;
  }

  .focus-park-button {
    margin-top: 12px;
    padding: 10px 18px;
    font-size: 0.9rem;
  }

  .focus-exit-button {
    margin-top: 56px;
    border: 0;
    background: transparent;
    color: #8a8a84;
    font-size: 0.85rem;
    font-weight: 600;

    &:hover {
      color: #252525;
    }
  }

  .focus-finished {
    text-align: center;

    .focus-title {
      margin-top: 18px;
    }

    .button {
      margin-top: 36px;
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

  @media (max-width: 640px) {
    min-height: calc(100vh - 64px);
    padding: 24px 18px;

    .focus-content {
      margin-top: 24px;
    }

    .focus-title {
      font-size: 2rem;
    }

    .focus-description {
      margin-top: 14px;
      font-size: 0.95rem;
    }

    .focus-timer {
      margin-top: 32px;
      font-size: 2.25rem;
    }

    .focus-done-button {
      width: 100%;
      max-width: 320px;
      min-height: 48px;
      margin-top: 36px;
    }

    .focus-exit-button {
      margin-top: 44px;
      min-height: 44px;
    }
  }
`;
