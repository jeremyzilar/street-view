"use client";

import { useEffect, useState } from "react";
import { Map } from "@/components/Map";
import { EncampmentsRecord } from "@/types/airtable";

export function EncampmentsList() {
  const [encampments, setEncampments] = useState<EncampmentsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEncampments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/encampments");
        if (!res.ok) {
          throw new Error("Failed to fetch encampments");
        }
        const data = await res.json();
        setEncampments(data.encampments || []);
      } catch {
        setError("Failed to load encampments.");
      } finally {
        setLoading(false);
      }
    };
    void fetchEncampments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }) +
      " at " +
      time
    );
  };

  return (
    <>
      <div className="mb-8">
        <Map
          onLocationSelect={() => {
            // Read-only map, no location selection
          }}
          readOnly={true}
        />
      </div>
      {loading ? (
        <p className="text-gray-600">Loading encampments...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : encampments.length === 0 ? (
        <p className="text-gray-600">No encampments found.</p>
      ) : (
        <ul className="space-y-4">
          {encampments
            .slice() // create a shallow copy to avoid mutating state
            .sort(
              (a, b) => (b.fields.active ? 1 : 0) - (a.fields.active ? 1 : 0)
            )
            .map((encampment) => (
              <li
                key={encampment.id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg text-gray-900 dark:text-white ">
                            {encampment.fields.name}
                          </span>
                          <span
                            className={`text-xs font-normal text-gray-500 dark:text-gray-200 px-2 rounded-full ${
                              encampment.fields.active
                                ? "bg-emerald-200 dark:bg-emerald-700"
                                : "bg-red-200 dark:bg-red-700"
                            }`}
                          >
                            {encampment.fields.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-normal text-sm">
                          People: {encampment.fields.count}
                        </p>
                      </div>

                      {encampment.fields.notes && (
                        <div className="text-gray-700 dark:text-gray-300 font-normal text-sm">
                          {encampment.fields.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 h-full">
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      Updated: {formatDate(encampment.fields.last_updated)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
