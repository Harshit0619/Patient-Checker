import { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentForm from './components/AppointmentForm.jsx';
import AppointmentList from './components/AppointmentList.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // You missed this import

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
  const savedTheme = localStorage.getItem('darkMode') === 'true';
  setDarkMode(savedTheme);
}, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchAppointments(); // Fetch once on mount
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-6 transition">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Patient Appointment Tracker</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Appointment Form with callback to refetch */}
        <AppointmentForm
          onAppointmentAdded={fetchAppointments}
          selectedAppointment={selectedAppointment}
          clearSelected={() => setSelectedAppointment(null)}
        />


        {/* Appointment List */}
            <AppointmentList
              appointments={appointments}
              onDelete={fetchAppointments}
              onEdit={(appt) => setSelectedAppointment(appt)}
            />

        {/* Toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
