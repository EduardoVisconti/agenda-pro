import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function AppointmentModal({ isOpen, setIsOpen, onAppointmentAdded }) {
  const [form, setForm] = useState({
    name: "",
    service: "",
    date: "",
    hour: "09",
    minutes: "00",
    period: "AM",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, hour, minutes, period, ...rest } = form;

    if (!date || !hour || !minutes || !period) return;

    const hour24 =
      period === "PM" && hour !== "12"
        ? parseInt(hour) + 12
        : period === "AM" && hour === "12"
        ? 0
        : parseInt(hour);

    const formattedDate = new Date(`${date}T${String(hour24).padStart(2, "0")}:${minutes}:00`);

    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...rest,
        date: formattedDate.toISOString(),
        createdAt: serverTimestamp(),
      });

      onAppointmentAdded({ id: docRef.id, ...form, date: formattedDate.toISOString() });
      setForm({
        name: "",
        service: "",
        date: "",
        hour: "09",
        minutes: "00",
        period: "AM",
        notes: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutesList = ["00", "15", "30", "45"];

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800">
            New Appointment
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Client name"
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="Service"
              required
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />

            <div className="flex gap-2">
              <select name="hour" value={form.hour} onChange={handleChange} className="border p-2 rounded w-full">
                {hours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>

              <select name="minutes" value={form.minutes} onChange={handleChange} className="border p-2 rounded w-full">
                {minutesList.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select name="period" value={form.period} onChange={handleChange} className="border p-2 rounded w-full">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes (optional)"
              rows="3"
              className="border p-2 rounded"
            />

            <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              Save
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
