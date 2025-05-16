import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Register from './components/views/Register';
import Safe from './components/views/Safe';
import SafeSuccess from './components/views/SafeSuccess';
import ProductList from './components/views/ProductList';
import './styles/global.css';

const App: React.FC = () => {
    return (
        <Suspense fallback="loading">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/safe" element={<Safe />} />
                        <Route path="/safe/success" element={<SafeSuccess />} />
                        <Route path="/products" element={<ProductList />} />
                    </Routes>
                </Layout>
            </Router>
        </Suspense>
    );
};

export default App; 