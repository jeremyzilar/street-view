"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Map } from "@/components/Map";
import { createEncampmentsRecord } from "@/lib/airtable";
import { EncampmentsFormFields } from "@/types/airtable";

export default function AddEncampment() {
  const router = useRouter();
  const [formData, setFormData] = useState<EncampmentsFormFields>({
    name: "",
    notes: "",
    coordinates: "",
    active: true,
    geocode_cache: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      notes: "",
      coordinates: "",
      active: true,
      geocode_cache: undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: `${lat},${lng}`,
      geocode_cache: `🔵 eyJpIjoi${lat}, ${lng}IiwibyI6eyJzdGF0dXMiOiJPSyIsImxhdCI6${lat}LCJsbmciOi0${lng}LCJibG9ja0luc3RhbGxhdGlvbklkcyI6WyJibGk4WElLR1NxaDdBdGlBRiJdLCJsb2NhdGlvbkZpZWxkSWQiOiJmbGRPZktOZXJmMkFUSmxmTSJ9LCJlIjowfQ==`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await createEncampmentsRecord(formData);
      setSuccess(true);
      resetForm();
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create encampment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto pb-20">
      <h1 className="text-2xl font-bold mb-6">Add New Encampment</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Encampment created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
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
              {formData.active ? "Active" : "Inactive"}
            </label>
          </div>
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
            rows={3}
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <Map
            onLocationSelect={handleLocationSelect}
            initialCoordinates={formData.coordinates}
            address={formData.name}
            geocodeCache={formData.geocode_cache}
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
            readOnly
            placeholder="Click on the map to set coordinates"
            className="bg-gray-50 dark:bg-gray-800 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm cursor-not-allowed dark:border-gray-600 dark:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Encampment"}
        </button>
      </form>
    </main>
  );
}
