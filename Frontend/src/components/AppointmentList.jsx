import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AppointmentList({ appointments = [], onDelete, onEdit }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      toast.success("🗑️ Appointment deleted");
      onDelete && onDelete(); // Refresh list
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("❌ Failed to delete appointment");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No appointments yet.</p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {appointments.map((appt) => (
              <motion.li
                key={appt._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-start"
              >
                <div>
                  <strong>{appt.name}</strong> – {appt.date} <br />
                  <span className="text-sm">{appt.reason}</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit && onEdit(appt)}
                    className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
