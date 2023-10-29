import axios from 'axios';
import { apiBaseUrl } from '../../api/ApiConfig';

class ApiViewService {
    apiBaseUrl: string;

    constructor() {
        this.apiBaseUrl = apiBaseUrl;
    }

    public async getData(endpoint: string) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}${endpoint}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async postData(endpoint: string, data: any) {
        try {
            const response = await axios.post(`${this.apiBaseUrl}${endpoint}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": apiBaseUrl,
                    "Accept": "*/*",
                    "X-Requested-With": "XMLHttpRequest",
                    "Cache-Control": "no-cache",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ApiViewService;
