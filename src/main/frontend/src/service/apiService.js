import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

export const fetchItems = () => apiClient.get('/items');
export const createItem = (item) => apiClient.post('/items', item);
export const updateItem = (item) => apiClient.put(`/items/${item.id}`, item);
export const deleteItem = (id) => apiClient.delete(`/items/${id}`);