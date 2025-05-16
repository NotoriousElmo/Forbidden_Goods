import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import safeService from "../../services/SafeService";
import '../../styles/safe.css';
import { useTranslation } from 'react-i18next';

const SafeSuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [authorQuery, setAuthorQuery] = useState('');
    const [currentFlag, setCurrentFlag] = useState<string | null>(location.state?.flag || null);
    const [showFlag, setShowFlag] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!location.state?.flag) {
            navigate('/safe');
        } else {
            setShowFlag(true);
        }
    }, [location.state, navigate]);

    const handleAuthorSearch = async () => {
        try {
            setShowFlag(false);
            const response = await safeService.submitAuthor(authorQuery);
            setTimeout(() => {
                setCurrentFlag(response.message);
                setShowFlag(true);
            }, 500);
            setError('');
        } catch (err) {
            setError(t('safe.authorError'));
        }
    };

    if (!location.state?.flag) {
        return null;
    }

    return (
        <div className="safe-success">
            {currentFlag && (
                <div className={`flag-banner ${showFlag ? 'fade-in' : 'fade-out'}`}>
                    <h2>{t('safe.flagFound')}</h2>
                    <p className="flag-text">{currentFlag}</p>
                </div>
            )}

            <div className="author-section">
                <div className="encrypted-message-container">
                    <h3>{t('safe.encryptedAuthor')}</h3>
                    <p className="encrypted-text">6245ac0c8b177361766c2be0ef053876</p>
                </div>

                <div className="author-form">
                    <input
                        type="text"
                        placeholder={t('safe.enterAuthor')}
                        value={authorQuery}
                        onChange={(e) => setAuthorQuery(e.target.value)}
                        className="safe-input"
                    />
                </div>

                {error && <div className="safe-error">{error}</div>}
            </div>

            <div className="button-container">
                <button onClick={handleAuthorSearch} className="safe-button">
                    {t('safe.success.searchAuthor')}
                </button>

                <button onClick={() => navigate('/')} className="back-button">
                    {t('common.backToHome')}
                </button>
            </div>
        </div>
    );
};

export default SafeSuccess;
