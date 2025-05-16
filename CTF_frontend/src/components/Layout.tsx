import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authService from '../services/AuthService';
import Flag from './Flag';
import '../styles/layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<'EE' | 'GB'>(() => {
        return i18n.language === 'et' ? 'EE' : 'GB';
    });

    useEffect(() => {
        setSelectedCountry(i18n.language === 'et' ? 'EE' : 'GB');
    }, [i18n.language]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFlagSelect = (country: 'EE' | 'GB') => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        i18n.changeLanguage(country === 'EE' ? 'et' : 'en');
    };

    return (
        <div className="layout">
            <nav className="nav">
                <div className="nav-left">
                    <Link to="/" className="nav-link">
                        {t('common.home')}
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/products" className="nav-link">
                                {t('common.products')}
                            </Link>
                            {isAdmin ? (
                                <>
                                    <Link to="/create-posting" className="nav-link">{t('common.createPosting')}</Link>
                                    <Link to="/my-postings" className="nav-link">{t('common.myPostings')}</Link>
                                    <Link to="/safe" className="nav-link">{t('safe.title')}</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/create-posting" className="nav-link">{t('common.createPosting')}</Link>
                                    <Link to="/my-postings" className="nav-link">{t('common.myPostings')}</Link>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">{t('common.login')}</Link>
                            <Link to="/register" className="nav-link">{t('common.register')}</Link>
                        </>
                    )}
                </div>
                <div className="nav-right">
                    <div className="language-dropdown">
                        <button className="language-button" onClick={toggleDropdown}>
                            <Flag country={selectedCountry} className="flag-image" />
                            {t('common.language')}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={() => handleFlagSelect('EE')}>
                                    <Flag country="EE" className="flag-image" />
                                    Eesti
                                </button>
                                <button className="dropdown-item" onClick={() => handleFlagSelect('GB')}>
                                    <Flag country="GB" className="flag-image" />
                                    English
                                </button>
                            </div>
                        )}
                    </div>
                    {isAuthenticated && (
                        <button onClick={handleLogout} className="nav-button">
                            {t('common.logout')}
                        </button>
                    )}
                </div>
            </nav>
            <main className="main">
                {children}
            </main>
        </div>
    );
};

export default Layout; 