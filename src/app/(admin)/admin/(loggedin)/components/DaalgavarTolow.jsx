"use client";

import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const DaalgavarTolow = () => {
  const [taskStates, setTaskStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskStates = async () => {
      try {
        const response = await fetch("/api/taskstate");
        if (!response.ok) {
          throw new Error("Failed to fetch task states");
        }
        const data = await response.json();
        const initializedStates = data.map((item) => ({ ...item, isEditing: false }));
        setTaskStates(initializedStates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskStates();
  }, []);

  const toggleEdit = (index) => {
    const state = taskStates[index];
    if (state.isEditing) {
      saveChanges(state);
    }
    setTaskStates((prevStates) =>
      prevStates.map((s, i) => (i === index ? { ...s, isEditing: !s.isEditing } : s))
    );
  };

  const updateField = (index, field, value) => {
    setTaskStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, [field]: value } : state
      )
    );
  };
  const saveChanges = async (state) => {
    try {
      const response = await fetch("/api/taskstate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Daalgavar_tuluv_lavlah_id: state.Daalgavar_tuluv_lavlah_id,
          Daalgavar_tuluv_lavlah_ner: state.Daalgavar_tuluv_lavlah_ner,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save changes");
      }
  
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error saving changes:", error.message);
    }
  };
  const deleteTaskState = async (id) => {
    try {
      const response = await fetch("/api/taskstate", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Daalgavar_tuluv_lavlah_id: id }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete task state");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      setTaskStates((prevStates) =>
        prevStates.filter((state) => state.Daalgavar_tuluv_lavlah_id !== id)
      );
    } catch (error) {
      console.error("Error deleting task state:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full text-black">
      <table className="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr className="border">
            <th className="px-6 py-3 text-left text-gray-700 border-b">Даалгаврын төлвийн id</th>
            <th className="px-6 py-3 text-left text-gray-700 border-b">Даалгаврын төлвийн нэр</th>
            <th className="px-6 py-3 text-left text-gray-700 border-b">Засах</th>
            <th className="px-6 py-3 text-left text-gray-700 border-b">Устгах</th>
          </tr>
        </thead>
        <tbody>
          {taskStates.map((state, index) => (
            <tr key={index} className="transition-colors duration-200 hover:bg-gray-100">
              <td className="px-6 py-4 text-gray-600 border-b">
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={state.Daalgavar_tuluv_lavlah_id}
                  disabled={!state.isEditing}
                  onChange={(e) => updateField(index, "Daalgavar_tuluv_lavlah_id", e.target.value)}
                />
              </td>
              <td className="px-6 py-4 text-gray-600 border-b">
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={state.Daalgavar_tuluv_lavlah_ner}
                  disabled={!state.isEditing}
                  onChange={(e) => updateField(index, "Daalgavar_tuluv_lavlah_ner", e.target.value)}
                />
              </td>
              <td className="px-6 py-4 text-gray-600 border-b">
                <button
                  type="button"
                  onClick={() => toggleEdit(index)}
                  className={`flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium ${
                    state.isEditing
                      ? "text-blue-700 bg-gray-100"
                      : "text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700"
                  } focus:outline-none border rounded-full`}
                >
                  <FaRegEdit />
                  {state.isEditing ? "Хадгалах" : "Засах"}
                </button>
              </td>
              <td className="px-6 py-4 text-gray-600 border-b">
                <button
                  type="button"
                  onClick={() => deleteTaskState(state.Daalgavar_tuluv_lavlah_id)}
                  className="flex items-center gap-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <MdDeleteOutline />
                  Устгах
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DaalgavarTolow;
