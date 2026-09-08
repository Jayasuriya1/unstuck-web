import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from './authApi';
import { LoginWrapper } from './styles/LoginPageStyle';

export function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        try {
            const data = await loginUser({
                email: email.trim(),
                password,
            });

            localStorage.setItem(
                'accessToken',
                data.accessToken,
            );

            navigate('/tasks');
        } catch {
            setError(
                'Invalid email or password.',
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <LoginWrapper>
            <div className="auth-card">
                <div className="auth-header">
                    <p className="auth-brand">
                        unstuck
                    </p>

                    <h1 className="auth-title">
                        Welcome back 👋
                    </h1>

                    <p className="auth-description">
                        Sign in to continue making
                        progress.
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

                    <div className="form-group">
                        <div className="auth-label-row">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>

                            <Link
                                to="/forgot-password"
                                className="auth-link"
                            >
                                Forgot password?
                            </Link>
                        </div>

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
                            placeholder="Enter your password"
                            autoComplete="current-password"
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
                            ? 'Logging in...'
                            : 'Login'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>
                        Don't have an account?
                    </span>

                    <Link
                        to="/register"
                        className="auth-link"
                    >
                        Create account
                    </Link>
                </div>
            </div>
        </LoginWrapper>
    );
}