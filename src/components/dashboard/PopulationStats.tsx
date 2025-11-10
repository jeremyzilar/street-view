import type { PopulationStats as PopulationStatsType } from "@/types/dashboard";

interface PopulationStatsProps {
  stats: PopulationStatsType;
}

export function PopulationStats({ stats }: PopulationStatsProps) {
  const statItems = [
    {
      label: "Total People Tracked",
      value: stats.totalPeople,
      color: "text-gray-900 dark:text-white",
    },
    {
      label: "Currently Unhoused",
      value: stats.currentlyUnhoused,
      color: "text-red-600 dark:text-red-400",
    },
    {
      label: "Currently Placed",
      value: stats.currentlyPlaced,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Exited to Housing",
      value: stats.exitedToHousing,
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "Other Exits",
      value: stats.otherExits,
      color: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Current Population
      </h2>
      <div className="grid grid-cols-2 tablet:grid-cols-5 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`text-3xl font-bold ${item.color}`}>
              {item.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

