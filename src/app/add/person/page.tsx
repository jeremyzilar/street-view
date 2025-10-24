"use client";

import { StatusMessage } from "@/components/StatusMessage";
import { createPeopleRecord } from "@/lib/airtable";
import { PeopleFormFields, PeopleTableFields } from "@/types/airtable";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export default function AddPersonPage() {
  const [formData, setFormData] = useState<PeopleFormFields>({
    "Full Name": "",
    "Date of Birth": "",
    Phone: "",
    Notes: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const airtableData: PeopleTableFields = {
        "Full Name": formData["Full Name"],
        "Date of Birth": formData["Date of Birth"],
        Phone: formData.Phone,
        Notes: formData.Notes,
      };

      void createPeopleRecord(airtableData);
      setStatus("success");
      setFormData({
        "Full Name": "",
        "Date of Birth": "",
        Phone: "",
        Notes: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PageLayout>
      <div className="tablet-lg:w-tablet">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Add a Person
        </h1>

        <StatusMessage type="error" message={errorMessage || ""} />
        <StatusMessage
          type="success"
          message={status === "success" ? "Person created successfully!" : ""}
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="Full Name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Full Name"
              name="Full Name"
              value={formData["Full Name"]}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="Date of Birth"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="Date of Birth"
              name="Date of Birth"
              value={formData["Date of Birth"]}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="Phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone
            </label>
            <input
              type="tel"
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="Notes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Notes
            </label>
            <textarea
              id="Notes"
              name="Notes"
              value={formData.Notes}
              onChange={handleChange}
              rows={4}
              className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 resize-none text-gray-900 dark:text-white"
              placeholder="Add any additional notes here..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {status === "submitting" ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
