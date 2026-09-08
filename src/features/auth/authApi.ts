import { apiClient } from '../../api/client';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
}

interface RegisterRequest {
    email: string;
    password: string;
}

interface RegisterResponse {
    id: string;
    email: string;
}

interface ForgotPasswordRequest {
    email: string;
}

interface ForgotPasswordResponse {
    message: string;
}

interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

interface ResetPasswordResponse {
    message: string;
}

export async function loginUser(
    credentials: LoginRequest,
): Promise<LoginResponse> {
    const response =
        await apiClient.post<LoginResponse>(
            '/auth/login',
            credentials,
        );

    return response.data;
}

export async function registerUser(
    credentials: RegisterRequest,
): Promise<RegisterResponse> {
    const response =
        await apiClient.post<RegisterResponse>(
            '/auth/register',
            credentials,
        );

    return response.data;
}

export async function forgotPassword(
    data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
    const response =
        await apiClient.post<ForgotPasswordResponse>(
            '/auth/forgot-password',
            data,
        );

    return response.data;
}

export async function resetPassword(
    data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
    const response =
        await apiClient.post<ResetPasswordResponse>(
            '/auth/reset-password',
            data,
        );

    return response.data;
}