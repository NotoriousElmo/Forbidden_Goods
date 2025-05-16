import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authService from '../../services/AuthService';
import '../../styles/auth.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.register({ username, email, password });
            if (response.message.startsWith('FBG{')) {
                authService.setFlag(response.message);
            }
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } catch (err) {
            setError(t('auth.register.error'));
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">{t('auth.register.title')}</h1>
            <div className="flag-banner">
                <h2>{t('home.flagFound')}</h2>
                <p className="flag-text">{'FBG{tjczvdffkxaidhrweffm}'}</p>
            </div>
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
                    type="email"
                    placeholder={t('common.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    {t('common.register')}
                </button>
                {error && <div className="auth-error">{error}</div>}
                <Link to="/login" className="auth-link">
                    {t('auth.register.hasAccount')}
                </Link>
            </form>
        </div>
    );
};

export default Register; 