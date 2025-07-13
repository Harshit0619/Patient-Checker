import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppointmentForm({ onAppointmentAdded, selectedAppointment, clearSelected }) {
  const [form, setForm] = useState({ name: '', date: '', reason: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Populate form on edit
  useEffect(() => {
    if (selectedAppointment) {
      setForm({
        name: selectedAppointment.name,
        date: selectedAppointment.date?.slice(0, 10),
        reason: selectedAppointment.reason,
      });
    }
  }, [selectedAppointment]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.reason.trim()) newErrors.reason = "Reason is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (selectedAppointment) {
        // EDIT
        const res = await axios.put(`http://localhost:5000/api/appointments/${selectedAppointment._id}`, form);
        toast.success("✅ Appointment updated!");
      } else {
        // ADD
        const res = await axios.post('http://localhost:5000/api/appointments', form);
        toast.success("✅ Appointment added!");
      }

      setForm({ name: '', date: '', reason: '' });
      setErrors({});
      onAppointmentAdded && onAppointmentAdded();
      clearSelected && clearSelected();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("❌ Failed to submit appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-4 transition">
      <div>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Patient Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="date"
          className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>

      <div>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Reason for Visit"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (selectedAppointment ? 'Updating...' : 'Adding...') : selectedAppointment ? 'Update' : 'Add Appointment'}
        </button>

        {selectedAppointment && (
          <button
            type="button"
            onClick={() => {
              clearSelected();
              setForm({ name: '', date: '', reason: '' });
            }}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
