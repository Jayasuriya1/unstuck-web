import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Link,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

import {
    resetPassword,
} from './authApi';
import { ResetPasswordWrapper } from './styles/ResetPasswordPageStyle';

export function ResetPasswordPage() {
    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get('token') ?? '';

    const [password, setPassword] =
        useState('');

    const [confirmPassword, setConfirmPassword] =
        useState('');

    const [error, setError] =
        useState('');

    const [isLoading, setIsLoading] =
        useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError('');

        if (!token) {
            setError(
                'This reset link is invalid.',
            );
            return;
        }

        if (
            password !==
            confirmPassword
        ) {
            setError(
                'Passwords do not match.',
            );
            return;
        }

        setIsLoading(true);

        try {
            await resetPassword({
                token,
                newPassword: password,
            });

            navigate('/login', {
                replace: true,
            });
        } catch {
            setError(
                'This reset link is invalid or has expired.',
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ResetPasswordWrapper>
            <div className="auth-card">
                <div className="auth-header">
                    <p className="auth-brand">
                        unstuck
                    </p>

                    <h1 className="auth-title">
                        Reset your password
                    </h1>

                    <p className="auth-description">
                        Choose a new password
                        for your account.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            New password
                        </label>

                        <input
                            id="password"
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value,
                                )
                            }
                            placeholder="Enter a new password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="confirm-password"
                            className="form-label"
                        >
                            Confirm password
                        </label>

                        <input
                            id="confirm-password"
                            className="form-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value,
                                )
                            }
                            placeholder="Enter the password again"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="button button-primary auth-submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Resetting...'
                            : 'Reset password'}
                    </button>
                </form>

                <div className="auth-footer">
                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        ← Back to login
                    </Link>
                </div>
            </div>
        </ResetPasswordWrapper>
    );
}