import { useState } from 'react';
import axios from 'axios';

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: '', date: '', reason: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/appointments', form);
    setForm({ name: '', date: '', reason: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-4 transition">
      <input
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Patient Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="date"
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Reason for Visit"
        value={form.reason}
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
        required
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Appointment</button>
    </form>
  );
}
