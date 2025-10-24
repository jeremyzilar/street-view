"use client";

import { useEffect, useState } from "react";
import { ProvidersRecord } from "@/types/airtable";
import Link from "next/link";

// Helper function to extract domain from URL
const getDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url; // fallback to original if URL parsing fails
  }
};

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
      {providers
        .filter((provider) => provider.fields.Publish === true)
        .map((provider) => (
          <div
            key={provider.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
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
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Open
                    </p>
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

            {(provider.fields.Website ||
              provider.fields.Phone ||
              provider.fields["Donate URL"]) && (
              <div className="bg-slate-100 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {provider.fields.Website && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Website:{" "}
                      <Link
                        href={provider.fields.Website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {getDomain(provider.fields.Website)}
                      </Link>
                    </p>
                  )}

                  {provider.fields.Phone && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone:{" "}
                      <Link
                        href={`tel:${provider.fields.Phone}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {provider.fields.Phone}
                      </Link>
                    </p>
                  )}
                </div>

                {provider.fields["Donate URL"] && (
                  <Link
                    href={provider.fields["Donate URL"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors whitespace-nowrap"
                  >
                    Donate
                  </Link>
                )}
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
