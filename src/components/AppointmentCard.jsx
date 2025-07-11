import { format } from "date-fns";

export default function AppointmentCard({ appointment, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 text-black">
      <h3 className="text-lg font-semibold">{appointment.name}</h3>
      <p className="text-sm">{appointment.service}</p>
      <p className="text-sm">
        {format(new Date(appointment.date), "PPP")} at{" "}
        {format(new Date(appointment.date), "p")}
      </p>
      {appointment.notes && (
        <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
      )}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(appointment)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(appointment.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
