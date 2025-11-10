import type { CurrentNeeds } from "@/types/dashboard";

interface CurrentNeedsCardProps {
  needs: CurrentNeeds;
  totalUnhoused: number;
}

export function CurrentNeedsCard({ needs, totalUnhoused }: CurrentNeedsCardProps) {
  const needItems = [
    {
      label: "Seeking Shelter",
      value: needs.seekingShelter,
      icon: "🏠",
      description: "Actively looking for shelter placement",
    },
    {
      label: "Medical Respite",
      value: needs.needsMedicalRespite,
      icon: "🏥",
      description: "Needs medical respite care",
    },
    {
      label: "Has Pets",
      value: needs.hasPets,
      icon: "🐕",
      description: "Requires pet-friendly accommodation",
    },
    {
      label: "Has Vehicle",
      value: needs.hasVehicle,
      icon: "🚗",
      description: "Owns a vehicle",
    },
    {
      label: "ADA Needs",
      value: needs.needsADA,
      icon: "♿",
      description: "Requires ADA accommodations",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Current Needs
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Specific needs of unhoused population
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {totalUnhoused}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Unhoused
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 gap-4">
        {needItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
          >
            <div className="text-2xl mb-1" aria-hidden="true">
              {item.icon}
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

