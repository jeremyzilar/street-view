"use client";

import { useEffect, useState } from "react";
import { DonationsRecord, ProvidersRecord } from "@/types/airtable";
import { getDonationsRecords, getProvidersRecords } from "@/lib/airtable";

export function DonationsList() {
  const [donations, setDonations] = useState<DonationsRecord[]>([]);
  const [providers, setProviders] = useState<ProvidersRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [donationsData, providersData] = await Promise.all([
          getDonationsRecords(),
          getProvidersRecords(),
        ]);
        setDonations(donationsData);
        setProviders(providersData);
      } catch {
        setError("Failed to load donations data.");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if date is past due
  const isPastDue = (dateString: string | undefined) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">Loading needs...</p>
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

  if (donations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">
          No items needed at this time.
        </p>
      </div>
    );
  }

  // Get provider name from linked record ID
  const getProviderName = (providerIds: string[] | undefined) => {
    if (!providerIds || providerIds.length === 0) return null;

    // Get the first provider by ID
    const providerId = providerIds[0];
    const provider = providers.find((p) => p.id === providerId);
    return provider?.fields.Name || null;
  };

  // Get phone number - donation's phone or fallback to provider's phone
  const getPhoneNumber = (donation: DonationsRecord) => {
    // First check if donation has a phone number
    if (donation.fields.Phone) {
      return donation.fields.Phone;
    }

    // Fall back to provider's phone
    if (
      donation.fields["Who needs it"] &&
      donation.fields["Who needs it"].length > 0
    ) {
      const providerId = donation.fields["Who needs it"][0];
      const provider = providers.find((p) => p.id === providerId);
      return provider?.fields.Phone || null;
    }

    return null;
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Items Needed List - Single Column */}
      {donations.map((donation) => (
        <div
          key={donation.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 overflow-hidden ${
            isPastDue(donation.fields["Date needed by"])
              ? "border-red-300 dark:border-red-800"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
          <div className="p-6">
            {donation.fields["Who needs it"] && (
              <div className="flex items-center gap-2 text-sm mb-3">
                <span className="font-semibold text-accent-purple-600 dark:text-accent-purple-400">
                  {getProviderName(donation.fields["Who needs it"])}
                </span>
              </div>
            )}
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">
              {donation.fields["Item needed"]}
            </h3>

            {donation.fields["Quantity needed"] && (
              <div className="flex items-center gap-1 mb-3">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Quantity:
                </span>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {donation.fields["Quantity needed"]}
                </span>
              </div>
            )}

            {donation.fields.Description && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                {donation.fields.Description}
              </p>
            )}
          </div>

          {/* Bottom Bar with Provider, Date, and Contact Info */}
          <div className="bg-slate-100 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            {/* Top row: Provider and Date */}
            <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
              {donation.fields["Date needed by"] && (
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isPastDue(donation.fields["Date needed by"])
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <span>Needed by:</span>
                  <span>{formatDate(donation.fields["Date needed by"])}</span>
                  {isPastDue(donation.fields["Date needed by"]) && (
                    <span className="text-xs ml-1">⚠️ Past due</span>
                  )}
                </div>
              )}
            </div>

            {/* Bottom row: How to Help */}
            <div className="flex items-center gap-2 flex-wrap text-sm">
              To donate:
              {donation.fields["How to donate"] && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-white">
                    {donation.fields["How to donate"]}
                  </span>
                </div>
              )}
              {getPhoneNumber(donation) && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">call</span>
                  <a
                    href={`tel:${getPhoneNumber(donation)}`}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {getPhoneNumber(donation)}
                  </a>
                </div>
              )}
              {donation.fields["Buy URL"] && (
                <a
                  href={donation.fields["Buy URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Buy Online
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
