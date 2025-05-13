"use client";

import { useState } from "react";
import { createEncampmentsRecord } from "@/lib/airtable";
import {
  EncampmentsFormFields,
  EncampmentsTableFields,
} from "@/types/airtable";

export default function AddEncampmentPage() {
  const [formData, setFormData] = useState<EncampmentsFormFields>({
    name: "",
    active: true,
    notes: "",
    coordinates: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const airtableData: EncampmentsTableFields = {
        name: formData.name,
        active: formData.active,
        notes: formData.notes,
        coordinates: formData.coordinates,
      };

      const result = await createEncampmentsRecord(airtableData);
      if (result) {
        setStatus("success");
        setFormData({
          name: "",
          active: true,
          notes: "",
          coordinates: "",
        });
      } else {
        setStatus("error");
        setErrorMessage("Failed to submit form");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Add New Encampment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
              placeholder="Enter encampment name"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="coordinates"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Coordinates
            </label>
            <input
              type="text"
              id="coordinates"
              name="coordinates"
              value={formData.coordinates}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
              placeholder="Enter coordinates (e.g., 35.6869° N, 105.9378° W)"
            />
          </div>

          <div className="relative">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="sr-only"
            />
            <label
              htmlFor="active"
              className={`flex items-center justify-center h-12 px-4 text-sm font-medium rounded cursor-pointer border transition-colors ${
                formData.active
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Active
            </label>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 resize-none text-gray-900 dark:text-white"
              placeholder="Add any additional notes here..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </div>

          {status === "success" && (
            <div className="p-4 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-100">
              Encampment added successfully!
            </div>
          )}

          {status === "error" && (
            <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-100">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
