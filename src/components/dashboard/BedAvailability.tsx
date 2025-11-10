import type { BedTypeDemand } from "@/types/dashboard";

interface BedAvailabilityProps {
  bedTypes: BedTypeDemand[];
}

export function BedAvailability({ bedTypes }: BedAvailabilityProps) {
  // Filter out bed types with no demand and sort by demand (highest need first)
  const activeBedTypes = bedTypes
    .filter((bed) => bed.demand > 0)
    .sort((a, b) => b.demand - a.demand);

  const totalDemand = activeBedTypes.reduce((sum, bed) => sum + bed.demand, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bed Type Needs
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Number of people needing each bed type
        </p>
      </div>

      <div className="space-y-3">
        {activeBedTypes.map((bed) => {
          const percentage = totalDemand > 0 ? (bed.demand / totalDemand) * 100 : 0;

          return (
            <div key={bed.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {bed.name}
                </div>
                <div className="text-red-600 dark:text-red-400 font-bold text-lg">
                  {bed.demand}
                </div>
              </div>

              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-red-500 dark:bg-red-600"
                  style={{
                    width: `${percentage}%`,
                  }}
                  title={`${bed.demand} people need ${bed.name}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {activeBedTypes.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No bed type demand data at this time.
        </div>
      )}

      {activeBedTypes.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Total Demand
            </span>
            <span className="font-bold text-red-600 dark:text-red-400 text-lg">
              {totalDemand}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Note: All existing beds are assumed to be full and occupied
          </p>
        </div>
      )}
    </div>
  );
}

