import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import Attendance from './components/Attendance';
import { getEmployees } from './api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('employees');

  useEffect(() => {
    // Load employees on mount
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HRMS Lite</h1>
        <nav>
          <button onClick={() => setActiveTab('employees')}>Employees</button>
          <button onClick={() => setActiveTab('attendance')}>Attendance</button>
        </nav>
      </header>
      <main>
        {activeTab === 'employees' && (
          <div>
            <AddEmployee onEmployeeAdded={fetchEmployees} />
            <EmployeeList employees={employees} onEmployeeDeleted={fetchEmployees} />
          </div>
        )}
        {activeTab === 'attendance' && <Attendance employees={employees} />}
      </main>
    </div>
  );
}

export default App;
