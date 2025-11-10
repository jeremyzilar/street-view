interface DashboardSummaryProps {
  currentlyUnhoused: number;
  totalBedsAvailable: number;
  seekingShelter: number;
  lastUpdated: string;
}

export function DashboardSummary({
  currentlyUnhoused,
  totalBedsAvailable,
  seekingShelter,
  lastUpdated,
}: DashboardSummaryProps) {
  const shortage = currentlyUnhoused - totalBedsAvailable;
  const lastUpdatedDate = new Date(lastUpdated);
  const formattedDate = lastUpdatedDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-lg shadow-lg p-8 tablet:p-12 text-white">
      <div className="max-w-4xl">
        <h1 className="text-3xl tablet:text-4xl desktop:text-5xl font-black mb-4">
          Real-Time Homeless Services Data
        </h1>
        <p className="text-xl tablet:text-2xl text-blue-100 mb-8">
          Santa Fe, New Mexico
        </p>

        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{currentlyUnhoused}</div>
            <div className="text-lg font-medium text-blue-100">
              Currently Unhoused
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{totalBedsAvailable}</div>
            <div className="text-lg font-medium text-blue-100">
              Beds Available Now
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{seekingShelter}</div>
            <div className="text-lg font-medium text-blue-100">
              Seeking Shelter
            </div>
          </div>
        </div>

        {shortage > 0 && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold">
              ⚠️ Current shortage:{" "}
              <span className="text-2xl font-black">{shortage}</span> more beds
              needed
            </p>
          </div>
        )}

        <div className="text-sm text-blue-200">
          Last updated: {formattedDate}
        </div>
      </div>
    </div>
  );
}

