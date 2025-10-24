"use client";

import { useEffect, useState } from "react";
import {
  PeopleRecord,
  ProvidersRecord,
  BedTypesRecord,
} from "@/types/airtable";
import { getProvidersRecords, getBedTypesRecords } from "@/lib/airtable";

export function PeopleTable() {
  const [people, setPeople] = useState<PeopleRecord[]>([]);
  const [providers, setProviders] = useState<ProvidersRecord[]>([]);
  const [bedTypes, setBedTypes] = useState<BedTypesRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [peopleRes, providersData, bedTypesData] = await Promise.all([
          fetch("/api/people"),
          getProvidersRecords(),
          getBedTypesRecords(),
        ]);

        if (!peopleRes.ok) {
          throw new Error("Failed to fetch people");
        }

        const peopleData = await peopleRes.json();
        setPeople(peopleData.people || []);
        setProviders(providersData);
        setBedTypes(bedTypesData);
      } catch {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  // Helper function to get provider names from IDs
  const getProviderNames = (providerIds: string[] | undefined) => {
    if (!providerIds || providerIds.length === 0) {
      return [];
    }
    return providerIds
      .map((id) => {
        const provider = providers.find((p) => p.id === id);
        return provider?.fields.Name;
      })
      .filter(Boolean) as string[];
  };

  // Helper function to get bed type names from IDs
  const getBedTypeNames = (bedTypeIds: string[] | undefined) => {
    if (!bedTypeIds || bedTypeIds.length === 0) {
      return [];
    }
    return bedTypeIds
      .map((id) => {
        const bedType = bedTypes.find((b) => b.id === id);
        return bedType?.fields.Name;
      })
      .filter(Boolean) as string[];
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading people...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">{error}</p>
      ) : people.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No people found.</p>
      ) : (
        <ul className="space-y-4">
          {people.map((person) => (
            <li
              key={person.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {person.fields["Full Name"]}
                  </span>
                  {person.fields.Status && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        person.fields.Status === "Placed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      }`}
                    >
                      {person.fields.Status}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                  {person.fields["Date of Birth"] && (
                    <div>
                      <span className="font-medium">Born:</span>{" "}
                      {person.fields["Date of Birth"]}
                    </div>
                  )}
                  {person.fields.Phone && (
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {person.fields.Phone}
                    </div>
                  )}
                </div>
                {person.fields["Bed Types Needed"] &&
                  person.fields["Bed Types Needed"].length > 0 && (
                    <div className="text-sm mt-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Bed Types Needed:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getBedTypeNames(person.fields["Bed Types Needed"]).map(
                          (bedType, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                            >
                              {bedType}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {person.fields.Providers &&
                  person.fields.Providers.length > 0 && (
                    <div className="text-sm mt-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Providers:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getProviderNames(person.fields.Providers).map(
                          (provider, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded"
                            >
                              {provider}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {person.fields.Notes && (
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    <span className="font-medium">Notes:</span>{" "}
                    {person.fields.Notes}
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
