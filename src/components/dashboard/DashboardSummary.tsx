interface DashboardSummaryProps {
  currentlyUnhoused: number;
  inShelter: number;
  onTheStreets: number;
  seekingShelter: number;
  lastUpdated: string;
}

export function DashboardSummary({
  currentlyUnhoused,
  inShelter,
  onTheStreets,
  seekingShelter,
  lastUpdated,
}: DashboardSummaryProps) {
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
      <div className="max-w-5xl">
        <h1 className="text-3xl tablet:text-4xl desktop:text-5xl font-black mb-4">
          Real-Time Homeless Services Data
        </h1>
        <p className="text-xl tablet:text-2xl text-blue-100 mb-8">
          Santa Fe, New Mexico
        </p>

        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{currentlyUnhoused}</div>
            <div className="text-lg font-medium text-blue-100">
              Currently Unhoused
            </div>
            <div className="text-sm text-blue-200 mt-1">
              Not in permanent housing
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{inShelter}</div>
            <div className="text-lg font-medium text-blue-100">In Shelter</div>
            <div className="text-sm text-blue-200 mt-1">
              Currently placed
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{onTheStreets}</div>
            <div className="text-lg font-medium text-blue-100">
              On the Streets
            </div>
            <div className="text-sm text-blue-200 mt-1">
              Unsheltered, living outside
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-5xl font-black mb-2">{seekingShelter}</div>
            <div className="text-lg font-medium text-blue-100">
              Seeking Shelter
            </div>
            <div className="text-sm text-blue-200 mt-1">
              Actively looking for placement
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          Last updated: {formattedDate}
        </div>
      </div>
    </div>
  );
}

