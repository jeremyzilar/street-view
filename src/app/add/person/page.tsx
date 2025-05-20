"use client";

import { StatusMessage } from "@/components/StatusMessage";
import { createPeopleRecord, getEncampmentsRecords } from "@/lib/airtable";
import {
  EncampmentsRecord,
  PeopleFormFields,
  PeopleTableFields,
  genderOptions,
} from "@/types/airtable";
import { useEffect, useState } from "react";

export default function AddPersonPage() {
  const [formData, setFormData] = useState<PeopleFormFields>({
    full_name: "",
    mothers_name: "",
    year_of_birth: "",
    gender: [],
    chronicity: "",
    veteran: false,
    vi_6months: false,
    notes: "",
    encampment: "",
  });
  const [encampments, setEncampments] = useState<EncampmentsRecord[]>([]);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEncampments = async () => {
      try {
        const records = await getEncampmentsRecords();
        setEncampments(records);
      } catch (error) {
        console.error("Failed to fetch encampments:", error);
      }
    };
    fetchEncampments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const airtableData: PeopleTableFields = {
        full_name: formData.full_name,
        mothers_name: formData.mothers_name,
        year_of_birth: formData.year_of_birth,
        gender: formData.gender[0] || "",
        chronicity: formData.chronicity,
        veteran: formData.veteran,
        vi_6months: formData.vi_6months,
        notes: formData.notes,
        encampment: formData.encampment,
      };

      const result = await createPeopleRecord(airtableData);
      if (result) {
        setStatus("success");
        setFormData({
          full_name: "",
          mothers_name: "",
          year_of_birth: "",
          gender: [],
          chronicity: "",
          veteran: false,
          vi_6months: false,
          notes: "",
          encampment: "",
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      gender: [value],
    }));
  };

  return (
    <div className="tablet-lg:w-tablet">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Add a Person
      </h1>

      <StatusMessage type="error" message={errorMessage || ""} />
      <StatusMessage
        type="success"
        message={status === "success" ? "Person created successfully!" : ""}
      />

      <h2 className="text-3xl font-mono mb-6 text-gray-900 dark:text-white space-x-1">
        <span>#</span>
        {`${
          formData.full_name
            ? formData.full_name.slice(0, 2).toUpperCase()
            : "__"
        }${
          formData.mothers_name
            ? formData.mothers_name.slice(0, 2).toUpperCase()
            : "__"
        }${formData.year_of_birth ? formData.year_of_birth.slice(-2) : "__"}`
          .split("")
          .map((char, index) => (
            <span key={index} className="inline-block">
              {char}
            </span>
          ))}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="mothers_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mother&apos;s Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="mothers_name"
            name="mothers_name"
            value={formData.mothers_name}
            onChange={handleChange}
            required
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="year_of_birth"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Year of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="year_of_birth"
            name="year_of_birth"
            value={formData.year_of_birth}
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty value or any number input
              if (value === "" || /^\d*$/.test(value)) {
                handleChange(e);
              }
            }}
            onBlur={(e) => {
              const value = e.target.value;
              // On blur, validate and format the year
              if (value) {
                const year = parseInt(value);
                if (year < 1900) {
                  setFormData((prev) => ({ ...prev, year_of_birth: "1900" }));
                } else if (year > new Date().getFullYear()) {
                  setFormData((prev) => ({
                    ...prev,
                    year_of_birth: new Date().getFullYear().toString(),
                  }));
                } else if (value.length !== 4) {
                  // If not 4 digits, format it
                  if (year < 2000) {
                    setFormData((prev) => ({
                      ...prev,
                      year_of_birth: "19" + value.padStart(2, "0"),
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      year_of_birth: "20" + value.padStart(2, "0"),
                    }));
                  }
                } else if (year < 2000 && !value.startsWith("19")) {
                  setFormData((prev) => ({
                    ...prev,
                    year_of_birth: "19" + value.slice(-2),
                  }));
                } else if (year >= 2000 && !value.startsWith("20")) {
                  setFormData((prev) => ({
                    ...prev,
                    year_of_birth: "20" + value.slice(-2),
                  }));
                }
              }
            }}
            required
            min="1900"
            max={new Date().getFullYear()}
            placeholder="YYYY"
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          {formData.year_of_birth && formData.year_of_birth.length !== 4 && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Please enter a 4-digit year starting with 19 or 20
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genderOptions.map((option) => (
              <div key={option.value} className="relative">
                <input
                  type="radio"
                  id={`gender-${option.value}`}
                  name="gender"
                  value={option.value}
                  checked={formData.gender.includes(option.value)}
                  onChange={handleGenderChange}
                  className="sr-only"
                />
                <label
                  htmlFor={`gender-${option.value}`}
                  className={`flex items-center justify-center h-12 px-4 text-sm font-medium rounded cursor-pointer border transition-colors ${
                    formData.gender.includes(option.value)
                      ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-white"
                      : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="chronicity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Chronicity
          </label>
          <input
            type="text"
            id="chronicity"
            name="chronicity"
            value={formData.chronicity}
            onChange={handleChange}
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="encampment"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Encampment
          </label>
          <select
            id="encampment"
            name="encampment"
            value={formData.encampment}
            onChange={handleChange}
            className="bg-white dark:bg-gray-700 px-2 py-2 block w-full rounded border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 dark:text-white"
          >
            <option value="">Select an encampment</option>
            {encampments
              .filter((encampment) => encampment.fields.active)
              .map((encampment) => (
                <option key={encampment.id} value={encampment.id}>
                  {encampment.fields.name}
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <input
              type="checkbox"
              id="veteran"
              name="veteran"
              checked={formData.veteran}
              onChange={handleChange}
              className="sr-only"
            />
            <label
              htmlFor="veteran"
              className={`flex items-center justify-center h-12 px-4 text-sm font-medium rounded cursor-pointer border transition-colors ${
                formData.veteran
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Veteran
            </label>
          </div>

          <div className="relative">
            <input
              type="checkbox"
              id="vi_6months"
              name="vi_6months"
              checked={formData.vi_6months}
              onChange={handleChange}
              className="sr-only"
            />
            <label
              htmlFor="vi_6months"
              className={`flex items-center justify-center h-12 px-4 text-sm font-medium rounded cursor-pointer border transition-colors ${
                formData.vi_6months
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              VI 6 Months
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
  );
}
