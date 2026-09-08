import styled from 'styled-components';

export const ResetPasswordWrapper = styled.main`
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 60px;

  .auth-card {
    width: min(100%, 420px);
    background: white;
    border: 1px solid #e8e8e4;
    border-radius: 18px;
    padding: 32px;
  }

  .auth-header {
    margin-bottom: 28px;
  }

  .auth-brand {
    margin: 0 0 24px;
    color: #252525;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .auth-title {
    margin: 0;
    color: #252525;
    font-size: 2rem;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .auth-description {
    margin: 9px 0 0;
    color: #73736e;
    line-height: 1.6;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
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

  .auth-submit {
    width: 100%;
    margin-top: 4px;
  }

  .auth-error {
    margin: 0;
    padding: 10px 12px;
    border: 1px solid #ead2cf;
    border-radius: 9px;
    background: #faf1ef;
    color: #9b4038;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .auth-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #eeeeea;
    color: #73736e;
    font-size: 0.85rem;
  }

  .auth-link {
    color: #555550;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: #252525;
      text-decoration: underline;
    }
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 28px 0 48px;

    .auth-card {
      padding: 24px 20px;
      border-radius: 14px;
    }

    .auth-title {
      font-size: 1.7rem;
    }
  }
`;
