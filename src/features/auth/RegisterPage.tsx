import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

import { registerUser } from './authApi';
import { RegisterWrapper } from './styles/RegisterPageStyle';

export function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =
        useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] =
        useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError(
                'Passwords do not match.',
            );
            return;
        }

        setIsLoading(true);

        try {
            await registerUser({
                email: email.trim(),
                password,
            });

            navigate('/login', {
                replace: true,
            });
        } catch (error: any) {
            if (
                error?.response?.status === 409
            ) {
                setError(
                    'An account with this email already exists.',
                );
            } else {
                setError(
                    'Unable to create your account. Please try again.',
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <RegisterWrapper>
            <div className="auth-card">
                <div className="auth-header">
                    <p className="auth-brand">
                        unstuck
                    </p>

                    <h1 className="auth-title">
                        Create your account
                    </h1>

                    <p className="auth-description">
                        Start turning overwhelming
                        tasks into manageable steps.
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
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Password
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
                            placeholder="Create a password"
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
                            ? 'Creating account...'
                            : 'Create account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>
                        Already have an account?
                    </span>

                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </RegisterWrapper>
    );
}