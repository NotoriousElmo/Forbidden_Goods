import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authService from '../../services/AuthService';
import '../../styles/auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.login({ username, password });
            if (response.message.startsWith('FBG{')) {
                authService.setFlag(response.message);
            }
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } catch (err) {
            setError(t('auth.login.error'));
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">{t('auth.login.title')}</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder={t('common.username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder={t('common.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                />
                <button type="submit" className="auth-button">
                    {t('common.login')}
                </button>
                {error && <div className="auth-error">{error}</div>}
                <Link to="/register" className="auth-link">
                    {t('auth.login.noAccount')}
                </Link>
            </form>
        </div>
    );
};

export default Login; 