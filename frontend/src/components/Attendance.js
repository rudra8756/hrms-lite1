import React, { useState } from 'react';
import { markAttendance, getAttendance } from '../api';

const Attendance = ({ employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    status: 'Present',
  });

  const handleEmployeeChange = async (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);
    if (empId) {
      try {
        const response = await fetch(`http://localhost:8000/attendance/${empId}`);
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    } else {
      setAttendanceRecords([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      alert('Please select an employee');
      return;
    }
    try {
      await markAttendance({ ...formData, employee_id: selectedEmployee });
      // Refresh attendance records
      handleEmployeeChange({ target: { value: selectedEmployee } });
      setFormData({ date: '', status: 'Present' });
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Error marking attendance');
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>
      <div>
        <label>Select Employee:</label>
        <select value={selectedEmployee} onChange={handleEmployeeChange}>
          <option value="">-- Select --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employee_id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>
      </div>
      {selectedEmployee && (
        <div>
          <h3>Mark Attendance</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <button type="submit">Mark Attendance</button>
          </form>
        </div>
      )}
      {attendanceRecords.length > 0 && (
        <div>
          <h3>Attendance Records</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
