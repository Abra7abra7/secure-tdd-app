import React, { useState } from 'react';

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Strict validation
        const newErrors: { username?: string; password?: string } = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear errors and submit validated data
        setErrors({});
        onSubmit(username, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-describedby={errors.username ? "username-error" : undefined}
                    />
                    {errors.username && <span id="username-error" className="error" role="alert">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {errors.password && <span id="password-error" className="error" role="alert">{errors.password}</span>}
                </div>

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};
