import { Product } from '../dto/IProduct';
import { ProductSearchResult } from '../dto/IProductSearchResult';
import ApiService from './ApiService';


class ProductService {
    async getProducts(): Promise<Product[]> {
        const response = await ApiService.get('/products');
        return response.data.products;
    }

    async searchProducts(query: string): Promise<ProductSearchResult> {
        const response = await ApiService.post('/products/search', { query });
        return response.data;
    }

    async getProduct(id: number): Promise<Product> {
        const response = await ApiService.get(`/products/${id}`);
        return response.data.product;
    }
}

export default new ProductService(); 