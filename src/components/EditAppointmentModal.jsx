import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function EditAppointmentModal({ isOpen, setIsOpen, appointment, onSave }) {
  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAppointment = {
      ...appointment,
      name: e.target.name.value,
      service: e.target.service.value,
      date: e.target.date.value,
      hour: e.target.hour.value,
      minutes: e.target.minutes.value,
      period: e.target.period.value,
      notes: e.target.notes.value,
    };

    onSave(updatedAppointment);
    setIsOpen(false);
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutesList = ["00", "15", "30", "45"];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={() => setIsOpen(false)}>
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

<div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 border-2 border-green-500 max-w-md w-full rounded-lg shadow-xl text-black max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Editar Agendamento
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
                <input
                  type="text"
                  name="name"
                  defaultValue={appointment.name}
                  placeholder="Client name"
                  required
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="service"
                  defaultValue={appointment.service}
                  placeholder="Service"
                  required
                  className="border p-2 rounded"
                />

                <input
                  type="date"
                  name="date"
                  defaultValue={appointment.date?.split("T")[0]}
                  required
                  className="border p-2 rounded"
                />

                <div className="flex gap-2">
                  <select name="hour" defaultValue={appointment.hour || "09"} className="border p-2 rounded w-full">
                    {hours.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>

                  <select name="minutes" defaultValue={appointment.minutes || "00"} className="border p-2 rounded w-full">
                    {minutesList.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select name="period" defaultValue={appointment.period || "AM"} className="border p-2 rounded w-full">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                <textarea
                  name="notes"
                  defaultValue={appointment.notes}
                  placeholder="Notes (optional)"
                  rows="3"
                  className="border p-2 rounded"
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}