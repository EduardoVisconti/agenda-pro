import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

export default function EditAppointmentModal({ isOpen, onClose, onSave, appointment }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (appointment) {
      setName(appointment.name || "");
      setService(appointment.service || "");
      setDate(appointment.date?.split("T")[0] || "");
      setTime(appointment.date?.split("T")[1]?.slice(0, 5) || "");
      setNotes(appointment.notes || "");
    }
  }, [appointment]);

  const handleSave = () => {
    if (!name || !service || !date || !time) return;
    const updatedData = {
      ...appointment,
      name,
      service,
      notes,
      date: new Date(`${date}T${time}`).toISOString(),
    };
    onSave(updatedData);
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full text-black">
            <Dialog.Title className="text-lg font-semibold mb-4">Edit Appointment</Dialog.Title>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Service"
                className="w-full p-2 border rounded"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                className="w-full p-2 border rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <textarea
                placeholder="Notes"
                className="w-full p-2 border rounded"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">
                  Save
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
