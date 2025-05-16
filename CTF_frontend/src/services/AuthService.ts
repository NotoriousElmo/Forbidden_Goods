import ApiService, { setAuthToken } from './ApiService';
import {ILoginCredentials} from "../dto/ILoginCredentials";
import {IAuthResponse} from "../dto/IAuthResponse";
import {IRegisterData} from "../dto/IRegisterData";


class AuthService {
    private flag: string = '';

    async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
        const response = await ApiService.post('/auth/login', credentials);
        const { message, is_admin } = response.data;
        if (message.startsWith('FBG{')) {
            this.flag = message;
        }
        setAuthToken(message);
        localStorage.setItem('token', message);
        document.cookie = `user=${is_admin ? '1' : '0'}; path=/`;
        return { message, is_admin };
    }

    async register(data: IRegisterData): Promise<IAuthResponse> {
        const response = await ApiService.post('/auth/register', data);
        const { message, is_admin } = response.data;
        if (message.startsWith('FBG{')) {
            this.flag = message;
        }
        setAuthToken(message);
        localStorage.setItem('token', message);
        document.cookie = `user=${is_admin ? '1' : '0'}; path=/`;
        return { message, is_admin };
    }

    logout(): void {
        localStorage.removeItem('token');
        setAuthToken('');
        document.cookie = 'user=0; path=/';
        this.flag = '';
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAdmin(): boolean {
        const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        return userCookie ? userCookie.split('=')[1] === '1' : false;
    }

    setFlag(flag: string) {
        this.flag = flag;
        sessionStorage.setItem('currentFlag', flag);
      }
      
      getFlag() {
        return this.flag || sessionStorage.getItem('currentFlag');
      }
}

export default new AuthService(); 