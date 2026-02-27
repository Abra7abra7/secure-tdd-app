import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm Component', () => {
    it('renders login form correctly', () => {
        render(<LoginForm onSubmit={vi.fn()} />);

        expect(screen.getByRole('heading', { level: 2, name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('validates empty fields on submit', () => {
        render(<LoginForm onSubmit={vi.fn()} />);

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('calls onSubmit with sanitized input when valid', () => {
        const mockOnSubmit = vi.fn();
        render(<LoginForm onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'SecureP@ssw0rd' } });

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith('admin', 'SecureP@ssw0rd');
        expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
    });
});
