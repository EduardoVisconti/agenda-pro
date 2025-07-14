import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={() => setIsOpen(false)} initialFocus={undefined}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-red-300">

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-[9999] border-2 border-green-500">

                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">New Appointment</Dialog.Title>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Client name" required className="border p-2 rounded" />
                  <input type="text" name="service" value={form.service} onChange={handleChange} placeholder="Service" required className="border p-2 rounded" />
                  <input type="date" name="date" value={form.date} onChange={handleChange} required className="border p-2 rounded" />

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

                  <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" rows="3" className="border p-2 rounded" />

                  <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Save</button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
