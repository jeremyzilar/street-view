"use client";

import { useEffect, useState } from "react";
import { PeopleRecord } from "@/types/airtable";

export function PeopleTable() {
  const [people, setPeople] = useState<PeopleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/people");
        if (!res.ok) throw new Error("Failed to fetch people");
        const data = await res.json();
        setPeople(data.people || []);
      } catch (err) {
        setError("Failed to load people.");
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

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
                    <span className="font-medium">Chronicity:</span>{" "}
                    {person.fields.chronicity}
                  </div>
                  <div>
                    <span className="font-medium">Encampment:</span>{" "}
                    {person.fields.encampment || "-"}
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
