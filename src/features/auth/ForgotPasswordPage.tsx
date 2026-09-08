import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Link,
} from 'react-router-dom';

import {
    forgotPassword,
} from './authApi';
import { ForgotPasswordWrapper } from './styles/ForgotPasswordPageStyle';

export function ForgotPasswordPage() {
    const [email, setEmail] =
        useState('');

    const [error, setError] =
        useState('');

    const [message, setMessage] =
        useState('');

    const [isLoading, setIsLoading] =
        useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            const response =
                await forgotPassword({
                    email: email.trim(),
                });

            setMessage(
                response.message,
            );
        } catch {
            setError(
                'Something went wrong. Please try again.',
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ForgotPasswordWrapper>
            <div className="auth-card">
                <div className="auth-header">
                    <p className="auth-brand">
                        unstuck
                    </p>

                    <h1 className="auth-title">
                        Forgot password?
                    </h1>

                    <p className="auth-description">
                        Enter your email and
                        we'll send you a reset
                        link if an account exists.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value,
                                )
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="auth-success">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="button button-primary auth-submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Sending...'
                            : 'Send reset link'}
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
        </ForgotPasswordWrapper>
    );
}