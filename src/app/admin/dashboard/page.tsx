"use client";

import { useState } from "react";
import Chat from "@/app/components/Chat";
import { MessageCircle } from "lucide-react";
import GlassmorphismCard from "@/app/components/GlassmorphismCard";

// Importações do Chart.js e react-chartjs-2
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export default function AdminDashboard() {
  const [showChat, setShowChat] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: "Dr. João Silva", specialty: "Cardiologia" },
    { id: 2, name: "Dra. Maria Santos", specialty: "Pediatria" },
  ]);

  // Estados para o modal de médicos
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "edit">("new");
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState("");

  // Dados para o gráfico de desempenho dos médicos
  const data = {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    datasets: [
      {
        label: "Dr. João Silva",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Dra. Maria Santos",
        data: [8, 15, 7, 12, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Atendimentos por Dia",
      },
    },
  };

  // Handlers para abertura do modal (novo/edição)
  const handleNewDoctor = () => {
    setModalMode("new");
    setCurrentDoctor(null);
    setNewDoctorName("");
    setNewDoctorSpecialty("");
    setShowDoctorModal(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setModalMode("edit");
    setCurrentDoctor(doctor);
    setNewDoctorName(doctor.name);
    setNewDoctorSpecialty(doctor.specialty);
    setShowDoctorModal(true);
  };

  const handleDoctorModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDoctorName.trim() && newDoctorSpecialty.trim()) {
      if (modalMode === "new") {
        const newId = doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1;
        const newDoctor: Doctor = {
          id: newId,
          name: newDoctorName,
          specialty: newDoctorSpecialty,
        };
        setDoctors((prev) => [...prev, newDoctor]);
      } else if (modalMode === "edit" && currentDoctor) {
        setDoctors((prev) =>
          prev.map((doc) =>
            doc.id === currentDoctor.id
              ? { ...doc, name: newDoctorName, specialty: newDoctorSpecialty }
              : doc
          )
        );
      }
      setShowDoctorModal(false);
    }
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard do Admin</h1>

      <div className="flex space-x-4 mb-8">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowDoctors(!showDoctors)}
        >
          {showDoctors ? "Ocultar Médicos" : "Ver Médicos"}
        </button>
      </div>

      {/* Card de Médicos */}
      {showDoctors && (
        <GlassmorphismCard className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Médicos</h2>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={handleNewDoctor}
            >
              Adicionar Médico
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Nome</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Especialidade</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="bg-white">
                    <td className="px-4 py-2 text-gray-900">{doctor.name}</td>
                    <td className="px-4 py-2 text-gray-900">{doctor.specialty}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                          onClick={() => handleEditDoctor(doctor)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                          onClick={() => handleDeleteDoctor(doctor.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassmorphismCard>
      )}

      {/* Card do Gráfico */}
      <GlassmorphismCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Desempenho dos Médicos</h2>
        <Bar data={data} options={options} />
      </GlassmorphismCard>

      {/* Botão flutuante do Chat */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
          onClick={() => setShowChat(!showChat)}
          aria-label="Abrir chat"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Popup do Chat */}
      {showChat && (
        <div className="fixed bottom-20 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-2xl w-80 p-4">
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-900">Chat</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowChat(false)}>
              X
            </button>
          </div>
          <Chat usuario="admin" />
        </div>
      )}

      {/* Modal para Adicionar/Editar Médico */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === "new" ? "Adicionar Médico" : "Editar Médico"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDoctorModal(false)}
              >
                X
              </button>
            </div>
            <form onSubmit={handleDoctorModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Nome do Médico
                </label>
                <input
                  type="text"
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Especialidade
                </label>
                <input
                  type="text"
                  value={newDoctorSpecialty}
                  onChange={(e) => setNewDoctorSpecialty(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white border border-blue-600 py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                {modalMode === "new" ? "Adicionar Médico" : "Salvar Alterações"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
