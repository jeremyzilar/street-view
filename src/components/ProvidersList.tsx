"use client";

import { useEffect, useState } from "react";
import { ProvidersRecord } from "@/types/airtable";

export function ProvidersList() {
  const [providers, setProviders] = useState<ProvidersRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/api/providers");
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await response.json();
        console.log("Providers data:", data);
        if (data.length > 0) {
          console.log("First provider fields:", data[0].fields);
          console.log("Available field names:", Object.keys(data[0].fields));
        }
        setProviders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">Loading providers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {providers.map((provider) => (
        <div
          key={provider.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {provider.fields.Name}
          </h3>

          {provider.fields.Operator && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-medium">Operated by:</span>{" "}
              {provider.fields.Operator}
            </p>
          )}

          {provider.fields["Population served"] && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Population Served:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provider.fields["Population served"]}
              </p>
            </div>
          )}

          {provider.fields["Services & Amenities"] && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Services & Amenities:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provider.fields["Services & Amenities"]}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
            {provider.fields["Total beds"] !== undefined && (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {provider.fields["Total beds"]}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Total Beds
                </p>
              </div>
            )}
            {provider.fields["Beds filled"] !== undefined && (
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {provider.fields["Beds filled"]}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Filled
                </p>
              </div>
            )}
            {provider.fields["Beds open now"] !== undefined && (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {provider.fields["Beds open now"]}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Open</p>
              </div>
            )}
          </div>

          {provider.fields["Capacity / Layout"] && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Capacity / Layout:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provider.fields["Capacity / Layout"]}
              </p>
            </div>
          )}

          {provider.fields["Entry / Referral Process"] && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Entry / Referral:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provider.fields["Entry / Referral Process"]}
              </p>
            </div>
          )}

          {provider.fields["Entry Criteria"] && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Entry Criteria:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provider.fields["Entry Criteria"]}
              </p>
            </div>
          )}
        </div>
      ))}

      {providers.length === 0 && (
        <div className="text-center py-12 col-span-full">
          <p className="text-gray-600 dark:text-gray-300">
            No providers found.
          </p>
        </div>
      )}
    </div>
  );
}
