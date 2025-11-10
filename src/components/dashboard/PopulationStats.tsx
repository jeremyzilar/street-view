import type { PopulationStats as PopulationStatsType } from "@/types/dashboard";

interface PopulationStatsProps {
  stats: PopulationStatsType;
}

export function PopulationStats({ stats }: PopulationStatsProps) {
  // Total people experiencing homelessness (both unhoused and in shelter)
  const totalHomeless = stats.currentlyUnhoused + stats.currentlyInShelter;

  const statItems = [
    {
      label: "Experiencing Homelessness",
      value: totalHomeless,
      color: "text-red-600 dark:text-red-400",
      description: "Total unhoused + in shelter",
    },
    {
      label: "In Shelter",
      value: stats.currentlyInShelter,
      color: "text-blue-600 dark:text-blue-400",
      description: "Currently placed in shelter",
    },
    {
      label: "On the Streets",
      value: stats.currentlyUnhoused,
      color: "text-orange-600 dark:text-orange-400",
      description: "Unsheltered, living outside",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Current Population
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        People experiencing homelessness in Santa Fe
      </p>
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`text-4xl font-bold ${item.color}`}>
              {item.value.toLocaleString()}
            </div>
            <div className="text-base font-medium text-gray-900 dark:text-white mt-2">
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
