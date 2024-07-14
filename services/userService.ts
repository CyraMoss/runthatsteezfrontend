import axios from 'axios';
import { User } from '../types/user';

const BASE_URL = 'http://localhost:3000';

export async function fetchUsers(): Promise<User[]> {
    const response = await axios.get(`${BASE_URL}/user`);
    return response.data;
}

export async function getUserById(id: string): Promise<User> {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    return response.data;
}

export async function createUser(user: Omit<User, '_id'>): Promise<User> {
    const response = await axios.post(`${BASE_URL}/user/`, user);
    return response.data;
}

export async function getAllUsers(): Promise<User[]> {
    return await fetchUsers();
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        await axios.delete(`${BASE_URL}/user/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete user:', error);
        return false;
    }
}

export async function updateUser(id: string, user: Partial<User>): Promise<User> {
    const response = await axios.put(`${BASE_URL}/user/${id}`, user);
    return response.data;
}
