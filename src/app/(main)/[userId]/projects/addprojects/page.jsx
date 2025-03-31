"use client";
import { useState } from "react";
import Image from "next/image";

const AddProjects = () => {
  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState("IT");
  const [projectStatus, setProjectStatus] = useState("Үргэлжилж буй");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [attachments, setAttachments] = useState(null);
  const [statuses, setStatuses] = useState([]);

  // Handle file selection
  const handleFileUpload = (e) => {
    setAttachments(e.target.files[0]);
  };

  // Save project data to the backend
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("projectCategory", projectCategory);
      formData.append("projectStatus", projectStatus);
      formData.append("projectStartDate", projectStartDate);
      formData.append("projectEndDate", projectEndDate);
      formData.append("projectDescription", projectDescription);

      if (attachments) {
        formData.append("attachments", attachments);
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const result = await response.json();
      console.log("Project saved:", result);

      alert("Төсөл амжилттай хадгалагдлаа!");

      // Reset form fields after saving
      setProjectName("");
      setProjectCategory("IT");
      setProjectStatus("Үргэлжилж буй");
      setProjectStartDate("");
      setProjectEndDate("");
      setProjectDescription("");
      setAttachments(null);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const handleCancel = () => {
    setProjectName("");
    setProjectCategory("IT");
    setProjectStatus("Үргэлжилж буй");
    setProjectStartDate("");
    setProjectEndDate("");
    setProjectDescription("");
    setAttachments(null);
  };

  return (
    <div className="w-full h-full relative flex flex-col items-start justify-start py-8 px-16 box-border gap-8 text-left">
      <div className="self-stretch flex justify-between items-center">
        <div className="font-bold text-[24px]">Төсөл нэмэх</div>
        <div className="flex items-center gap-[18px]">
          <button
            className="rounded-md bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleSave}
          >
            Хадгалах
          </button>
          <button
            className="rounded-md bg-gray-200 text-gray-800 py-2 px-4 hover:bg-gray-300"
            onClick={handleCancel}
          >
            Цуцлах
          </button>
        </div>
      </div>

      <div className="shadow-md rounded-md bg-white border p-6 mt-4">
        {/* Project Name */}
        <label className="mb-2 font-medium">Төслийн нэр</label>
        <input
          type="text"
          placeholder="Төсөл 1"
          className="w-full rounded-md border p-2"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        {/* Project Category */}
        <label className="mt-4 font-medium">Төслийн ангилал</label>
        <select
          className="w-full rounded-md border p-2"
          value={projectCategory}
          onChange={(e) => setProjectCategory(e.target.value)}
        >
          <option value="IT">IT</option>
          <option value="Marketing">Маркетинг</option>
          <option value="Finance">Санхүү</option>
        </select>

        {/* Project Status */}
        <label className="mt-4 font-medium">Төслийн төлөв</label>
        <select
          className="w-full rounded-md border p-2"
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
        >
           {statuses.map((status) => (
          <option key={status.Tusliin_tuluv_lavlah_id} value={status.Tusliin_tuluv_lavlah_ner}>
            {status.Tusliin_tuluv_lavlah_ner}
          </option>
        ))}

      </select>

        {/* Dates */}
        <label className="mt-4 font-medium">Эхлэх огноо</label>
        <input
          type="date"
          className="rounded-md border p-2"
          value={projectStartDate}
          onChange={(e) => setProjectStartDate(e.target.value)}
        />

        <label className="mt-4 font-medium">Дуусах огноо</label>
        <input
          type="date"
          className="rounded-md border p-2"
          value={projectEndDate}
          onChange={(e) => setProjectEndDate(e.target.value)}
        />

        {/* Attachments */}
        <label className="mt-4 font-medium">Нэмэлт хавсралт</label>
        <input type="file" className="mt-2" onChange={handleFileUpload} />
        {attachments && <p className="mt-2 text-gray-600">{attachments.name}</p>}
      </div>
    </div>
  );
};

export default AddProjects;
