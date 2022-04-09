import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/"
});

export const get = async <T>(url: string, params?: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.get<T>(url, { params: params });
    return response.data;
};

export const post = async <T>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.post<T>(url, data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const put = async <T>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.put<T>(url, data);
    return response.data;
};

export const _delete = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await instance.delete<T>(url);
    return response.data;
};
