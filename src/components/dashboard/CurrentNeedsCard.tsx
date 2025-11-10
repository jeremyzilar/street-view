import type { CurrentNeeds } from "@/types/dashboard";

interface CurrentNeedsCardProps {
  needs: CurrentNeeds;
}

export function CurrentNeedsCard({ needs }: CurrentNeedsCardProps) {
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
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Current Needs
        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
          (Unhoused only)
        </span>
      </h2>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5 gap-4">
        {needItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
          >
            <div className="text-3xl mb-2" aria-hidden="true">
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
              {item.label}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

