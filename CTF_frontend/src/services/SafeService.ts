import ApiService from './ApiService';
import Cookies from 'js-cookie';
import {ISafeResponse} from "../dto/ISafeResponse";

const ADMIN_COOKIE_NAME = 'admin_secret';

class SafeService {

    async attemptSafeAccess(secret: string): Promise<ISafeResponse> {
        try {
            const response = await ApiService.post('/safe/access', { secret });
            if (response.data.success) {
                return response.data;
            } else {
                return {
                    message: 'Failed to access safe',
                    success: false
                };
            }
        } catch (error) {
            return {
                message: 'Failed to access safe',
                success: false
            };
        }
    }

    async getFlag(): Promise<{ data: { message: string } }> {
        const response = await ApiService.post('/safe/submit', {});
        return response;
    }

    async submitAuthor(secret: string): Promise<{ message: string }> {
        try {
            const response = await ApiService.post('/safe/submit', { secret });
            return response.data;
        } catch (error) {
            throw new Error('Failed to submit author');
        }
    }
}

export default new SafeService(); 