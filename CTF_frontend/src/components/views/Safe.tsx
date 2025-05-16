import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import safeService from "../../services/SafeService";
import authService from "../../services/AuthService";
import '../../styles/safe.css';
import { useTranslation } from 'react-i18next';

const Safe: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (!authService.isAdmin()) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await safeService.attemptSafeAccess(code);
            if (response.success) {
                navigate('/safe/success', { state: { flag: response.message } });
            } else {
                setError(t('safe.error'));
            }
        } catch (err) {
            setError(t('safe.error'));
        }
    };

    if (!authService.isAdmin()) {
        return null;
    }

    return (
        <div className="safe-container">
            <div className="flag-banner">
                <h2>{t('home.flagFound')}</h2>
                <p className="flag-text">{"FBG{fdvrprconsvhvrazdzqr}"}</p>
            </div>
            <h1 className="safe-title">{t('safe.title')}</h1>
            <div className="encrypted-message-container">
                <h3>{t('safe.encryptedMessage')}</h3>
                <p className="encrypted-text">Q2FuIEkgcGxlYXNlIGVudGVyIHRoZSBzYWZlPw==</p>
            </div>
            <div className="safe-dial">
                <form onSubmit={handleSubmit} className="safe-form">
                    <input
                        type="text"
                        placeholder={t('safe.enterCode')}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="safe-input"
                        required
                    />
                    {error && <div className="safe-error">{error}</div>}
                    <button type="submit" className="safe-button">
                        {t('safe.submit')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Safe; 