"use client";

import { useEffect, useState } from "react";
import { PeopleRecord, EncampmentsRecord } from "@/types/airtable";

export function PeopleTable() {
  const [people, setPeople] = useState<PeopleRecord[]>([]);
  const [encampments, setEncampments] = useState<EncampmentsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(encampments);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [peopleRes, encampmentsRes] = await Promise.all([
          fetch("/api/people"),
          fetch("/api/encampments"),
        ]);

        if (!peopleRes.ok) {
          throw new Error("Failed to fetch people");
        }
        if (!encampmentsRes.ok) {
          throw new Error("Failed to fetch encampments");
        }

        const peopleData = await peopleRes.json();
        const encampmentsData = await encampmentsRes.json();

        setPeople(peopleData.people || []);
        setEncampments(encampmentsData.encampments || []);
      } catch {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  const getEncampmentName = (encampmentId: string | string[] | undefined) => {
    if (!encampmentId) {
      return "-";
    }
    // Handle case where encampmentId is an array (from Airtable)
    const id = Array.isArray(encampmentId) ? encampmentId[0] : encampmentId;
    const encampment = encampments.find((e) => e.id === id);
    console.log("Looking for encampment:", id, "Found:", encampment);
    return encampment?.fields.name || "-";
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-600">Loading people...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : people.length === 0 ? (
        <p className="text-gray-600">No people found.</p>
      ) : (
        <ul className="space-y-4">
          {people.map((person) => (
            <li
              key={person.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {person.fields.full_name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-200 px-2 rounded-full bg-blue-100 dark:bg-blue-700">
                    {person.fields.gender}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-200 px-2 rounded-full bg-gray-100 dark:bg-gray-700">
                    Born: {person.fields.year_of_birth}
                  </span>
                  {person.fields.veteran && (
                    <span className="text-xs text-white bg-amber-600 px-2 rounded-full">
                      Veteran
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium underline underline-offset-4 decoration-dotted flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {getEncampmentName(person.fields.encampment)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Chronicity:</span>{" "}
                    {person.fields.chronicity}
                  </div>
                </div>
                {person.fields.notes && (
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    <span className="font-medium">Notes:</span>{" "}
                    {person.fields.notes}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
