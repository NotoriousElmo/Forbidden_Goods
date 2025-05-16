import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/AuthService';
import '../../styles/home.css';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();
    const flag = authService.getFlag();
    const [showRegularFlag, setShowRegularFlag] = useState(true);
    const [showAdminFlag, setShowAdminFlag] = useState(false);

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            setShowRegularFlag(false);
            setTimeout(() => {
                setShowAdminFlag(true);
            }, 500);
        }
    }, [isAuthenticated, isAdmin]);

    return (
        <div className="home-container">
            {flag && showRegularFlag && (
                <div className={`flag-banner ${!showRegularFlag ? 'fade-out' : 'fade-in'}`}>
                    <h2>{t('home.flagFound')}</h2>
                    <p className="flag-text">{flag}</p>
                </div>
            )}
            
            {isAuthenticated && isAdmin && showAdminFlag && (
                <div className="admin-flag-banner fade-in">
                    <h2>{t('admin.flagFound')}</h2>
                    <p className="flag-text">{"FBG{gdzjmnigsayhnnrglolj}"}</p>
                </div>
            )}
            
            <div className="hero">
                <h1 className="hero-title">{t('home.title')}</h1>
                <p className="hero-subtitle">
                    {t('home.subtitle')}
                </p>
                {!isAuthenticated && (
                    <Link to="/register" className="hero-button">
                        {t('home.joinButton')}
                    </Link>
                )}
            </div>

            <div className="features">
                <div className="feature-card">
                    <h2 className="feature-title">{t('home.features.exclusive.title')}</h2>
                    <p className="feature-description">
                        {t('home.features.exclusive.description')}
                    </p>
                </div>

                <div className="feature-card">
                    <h2 className="feature-title">{t('home.features.secure.title')}</h2>
                    <p className="feature-description">
                        {t('home.features.secure.description')}
                    </p>
                </div>

                <div className="feature-card">
                    <h2 className="feature-title">{t('home.features.community.title')}</h2>
                    <p className="feature-description">
                        {t('home.features.community.description')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home; 