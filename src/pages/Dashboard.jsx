import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../context/UserContext";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentModal from "../components/AppointmentModal";
import EditAppointmentModal from "../components/EditAppointmentModal";

export default function Dashboard() {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const appts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appts);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "appointments", id));
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };
  
  const handleSaveEdit = async (updatedData) => {
    const ref = doc(db, "appointments", updatedData.id);
    const { id, date, ...rest } = updatedData;

    const hour24 =
      updatedData.period === "PM" && updatedData.hour !== "12"
        ? parseInt(updatedData.hour) + 12
        : updatedData.period === "AM" && updatedData.hour === "12"
        ? 0
        : parseInt(updatedData.hour);

    const isoDate = new Date(`${updatedData.date}T${String(hour24).padStart(2, "0")}:${updatedData.minutes}:00`).toISOString();
    

    await updateDoc(ref, {
      ...rest,
      date: isoDate,
    });
  };


  return (
    <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
      onClick={(e) => {
        e.currentTarget.blur(); // Remove o foco do botão
        setIsModalOpen(true);   // Open modal
      }}
      className="bg-red-600 px-4 py-2 text-white rounded"
    >
      NEW APPOINTMENT
    </button>


      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}

      <AppointmentModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />

      <EditAppointmentModal
        isOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        appointment={selectedAppointment}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
