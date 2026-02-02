import axios from "axios";

const API_BASE_URL = "https://hrms-lite1.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Employees
export const getEmployees = () => api.get("/employees");

export const createEmployee = (data) =>
  api.post("/employees", data);

export const deleteEmployee = (employeeId) =>
  api.delete(`/employees/${employeeId}`);

// Attendance
export const markAttendance = (data) =>
  api.post("/attendance", data);

export const getAttendance = (employeeId) =>
  api.get(`/attendance/${employeeId}`);

export default api;
