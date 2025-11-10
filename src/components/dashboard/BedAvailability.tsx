import type { BedTypeDemand } from "@/types/dashboard";

interface BedAvailabilityProps {
  bedTypes: BedTypeDemand[];
  totalAvailable: number;
}

export function BedAvailability({
  bedTypes,
  totalAvailable,
}: BedAvailabilityProps) {
  // Filter out bed types with no demand and sort by gap (highest need first)
  const activeBedTypes = bedTypes
    .filter((bed) => bed.demand > 0)
    .sort((a, b) => {
      // Sort by gap if available, otherwise by demand
      if (a.gap !== undefined && b.gap !== undefined) {
        return b.gap - a.gap;
      }
      return b.demand - a.demand;
    });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bed Availability
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
            Supply vs Demand
          </span>
        </h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalAvailable}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Beds Available
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activeBedTypes.map((bed) => {
          const availableNum =
            typeof bed.available === "number" ? bed.available : 0;
          const hasData = typeof bed.available === "number";
          const gap = bed.gap || bed.demand - availableNum;
          const isShortage = gap > 0;

          return (
            <div key={bed.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900 dark:text-white">
                  {bed.name}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-red-600 dark:text-red-400">
                    <span className="font-semibold">{bed.demand}</span> need
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    <span className="font-semibold">
                      {hasData ? availableNum : "—"}
                    </span>{" "}
                    available
                  </div>
                  {hasData && (
                    <div
                      className={
                        isShortage
                          ? "text-red-600 dark:text-red-400 font-semibold"
                          : "text-green-600 dark:text-green-400 font-semibold"
                      }
                    >
                      {isShortage ? "-" : "+"}
                      {Math.abs(gap)} gap
                    </div>
                  )}
                </div>
              </div>

              {hasData ? (
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 dark:bg-red-600"
                    style={{
                      width: `${Math.min(100, (bed.demand / Math.max(bed.demand, availableNum)) * 100)}%`,
                    }}
                    title={`${bed.demand} people need this bed type`}
                  />
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-600 opacity-70"
                    style={{
                      width: `${Math.min(100, (availableNum / Math.max(bed.demand, availableNum)) * 100)}%`,
                    }}
                    title={`${availableNum} beds available`}
                  />
                </div>
              ) : (
                <div className="text-xs text-gray-500 dark:text-gray-500 italic">
                  Availability data not configured in Airtable
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeBedTypes.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No active bed type demand at this time.
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span>Demand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span>Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}

