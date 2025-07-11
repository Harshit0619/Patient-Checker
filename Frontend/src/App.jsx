import AppointmentForm from './components/AppointmentForm.jsx';
import AppointmentList from './components/AppointmentList.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 max-w-3xl mx-auto transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Patient Appointment Tracker</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default App;
