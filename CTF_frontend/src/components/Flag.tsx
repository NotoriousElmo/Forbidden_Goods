import React from 'react';

interface FlagProps {
    country: 'EE' | 'GB';
    className?: string;
}

const Flag: React.FC<FlagProps> = ({ country, className }) => {
    const flags = {
        EE: (
            <svg viewBox="0 0 36 24" className={className}>
                <rect width="36" height="8" fill="#0072CE"/>
                <rect y="8" width="36" height="8" fill="#000"/>
                <rect y="16" width="36" height="8" fill="#fff"/>
            </svg>
        ),
        GB: (
            <svg viewBox="0 0 36 24" className={className}>
                <rect width="36" height="24" fill="#012169"/>
                <path d="M0,0 L36,24 M36,0 L0,24" stroke="#fff" strokeWidth="3.6"/>
                <path d="M18,0 L18,24 M0,12 L36,12" stroke="#fff" strokeWidth="6"/>
                <path d="M18,0 L18,24 M0,12 L36,12" stroke="#C8102E" strokeWidth="2.4"/>
                <path d="M0,0 L36,24 M36,0 L0,24" stroke="#C8102E" strokeWidth="1.2"/>
            </svg>
        )
    };

    return flags[country];
};

export default Flag; 