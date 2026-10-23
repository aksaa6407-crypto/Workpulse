import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const STORAGE_KEY = 'workpulse_employee_directory';

const DEFAULT_ROLES = [
  'Senior Software Engineer',
  'Lead Product Designer',
  'DevOps Architect',
  'Frontend Specialist',
  'Backend Engineer',
  'Data Platform Engineer',
  'Engineering Manager',
  'Technical Product Lead',
  'Solutions Architect',
  'Full Stack Developer'
];

const DEFAULT_SALARIES = [
  '95000',
  '112000',
  '128000',
  '88000',
  '104000',
  '118000',
  '145000',
  '132000',
  '120000',
  '98000'
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch from API or restore from local storage
  const fetchEmployees = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      if (!forceRefresh) {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEmployees(parsed);
            setLoading(false);
            setLastUpdated(new Date().toLocaleTimeString());
            return;
          }
        }
      }

      // Fetch from API
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to load users: HTTP ${response.status}`);
      }
      const data = await response.json();

      // Normalize data with id, name, email and fallback metadata
      const formatted = data.map((item, index) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        designation: DEFAULT_ROLES[index % DEFAULT_ROLES.length],
        location: item.address?.city || 'San Francisco, CA',
        salary: DEFAULT_SALARIES[index % DEFAULT_SALARIES.length],
        phone: item.phone || 'N/A',
        company: item.company?.name || 'Acme Corp',
        isLocal: false
      }));

      setEmployees(formatted);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching employee list:', err);
      setError(err.message || 'Unable to connect to employee API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add new employee from form
  const addEmployee = (newEmployee) => {
    // Generate next unique id
    const existingIds = employees.map((e) => Number(e.id)).filter((id) => !isNaN(id));
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const fullEmployee = {
      id: nextId,
      name: newEmployee.name.trim(),
      designation: newEmployee.designation.trim(),
      location: newEmployee.location.trim(),
      salary: String(newEmployee.salary).trim(),
      email: newEmployee.email?.trim() || `${newEmployee.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@workpulse.io`,
      isLocal: true,
      createdAt: new Date().toISOString()
    };

    const updated = [fullEmployee, ...employees];
    setEmployees(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setLastUpdated(new Date().toLocaleTimeString());
    return fullEmployee;
  };

  // Delete employee (bonus feature for interactive dashboard)
  const deleteEmployee = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setLastUpdated(new Date().toLocaleTimeString());
  };

  // Reset to initial API data
  const resetToApiData = () => {
    localStorage.removeItem(STORAGE_KEY);
    fetchEmployees(true);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        lastUpdated,
        addEmployee,
        deleteEmployee,
        resetToApiData,
        refreshEmployees: () => fetchEmployees(true)
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
