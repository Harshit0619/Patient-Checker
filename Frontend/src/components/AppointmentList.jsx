import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await axios.get('http://localhost:5000/api/appointments');
    setAppointments(res.data);
  };

  const deleteAppointment = async (id) => {
    await axios.delete(`http://localhost:5000/api/appointments/${id}`);
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Appointments</h2>
      <ul className="space-y-3">
        {appointments.map((appt) => (
          <li key={appt._id} className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">{appt.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{appt.date} - {appt.reason}</p>
            </div>
            <button className="text-red-500 hover:text-red-700" onClick={() => deleteAppointment(appt._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
