import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/products.css';
import { Product } from '../../dto/IProduct';
import ProductService from '../../services/ProductService';
import authService from '../../services/AuthService';
import phoneImg from '../../images/phone.jpg';
import tvImg from '../../images/tv.jpg';
import carImg from '../../images/car.jpg';
import bikeImg from '../../images/bike.jpg';
import laptopImg from '../../images/laptop.jpg';
import headphonesImg from '../../images/headphones.jpg';
import defaultImg from '../../images/image.jpg';


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [flag, setFlag] = useState<string | null>("FBG{vfmicougbnkldrkhirby}");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        loadProducts();
    }, [navigate, isAuthenticated]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const fetchedProducts = await ProductService.getProducts();
            setProducts(fetchedProducts);
            setSearchResults(fetchedProducts);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults(products);
            setFlag("FBG{vfmicougbnkldrkhirby}");
            return;
        }

        try {
            const result = await ProductService.searchProducts(searchQuery);
            setSearchResults(result.products);
            
            if (result.message && result.message.startsWith('FBG{')) {
                setFlag(result.message);
            } else {
                setFlag("FBG{vfmicougbnkldrkhirby}");
            }
        } catch (err) {
            setError('Search failed');
            setFlag("FBG{vfmicougbnkldrkhirby}");
        }
    };

    const getImageForProduct = (imageUrl: string) => {
        if (!imageUrl) {
            return defaultImg;
        }
        const filename = imageUrl.split('/').pop()?.toLowerCase();
        switch (filename) {
            case 'phone.jpg':
                return phoneImg;
            case 'tv.jpg':
                return tvImg;
            case 'car.jpg':
                return carImg;
            case 'bike.jpg':
                return bikeImg;
            case 'laptop.jpg':
                return laptopImg;
            case 'headphones.jpg':
                return headphonesImg;
            default:
                return defaultImg;
        }
    };

    const renderProductCard = (product: Product) => (
        <div className="product-card" key={product.id}>
            <img 
                src={getImageForProduct(product.image_url)} 
                alt={product.name} 
                className="product-image"
            />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price} €</p>
            </div>
        </div>
    );

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="products-container">
            <h1 className="products-title">{t('products.title')}</h1>
            
            {flag && (
                <div className="flag-banner">
                    <h2>{t('products.flagFound')}</h2>
                    <p className="flag-text">{flag}</p>
                </div>
            )}
            
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder={t('products.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        {t('common.search')}
                    </button>
                </form>
            </div>
            
            {loading && <div className="loading">{t('common.loading')}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <div className="products-grid">
                {searchResults.length > 0 ? (
                    searchResults.map(renderProductCard)
                ) : (
                    <div className="no-products">{t('products.noProducts')}</div>
                )}
            </div>
        </div>
    );
};

export default ProductList; 