import axios from 'axios';

const API_BASE_URL = 'https://hrms-lite1.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEmployees = () => api.get('/employees');
export const createEmployee = (data) => api.post('/employees', data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const markAttendance = (data) => api.post('/attendance', data);
export const getAttendance = (id) => api.get(`/attendance/${id}`);
