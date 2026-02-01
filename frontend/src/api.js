import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEmployees = () => api.get('/employees');
export const createEmployee = (data) => api.post('/employees', data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const markAttendance = (data) => api.post('/attendance', data);
export const getAttendance = (id) => api.get(`/attendance/${id}`);
