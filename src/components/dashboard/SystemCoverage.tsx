import type { SystemCoverage as SystemCoverageType } from "@/types/dashboard";

interface SystemCoverageProps {
  coverage: SystemCoverageType;
  totalPeople: number;
}

export function SystemCoverage({
  coverage,
  totalPeople,
}: SystemCoverageProps) {
  const calculatePercentage = (count: number) => {
    if (totalPeople === 0) return 0;
    return Math.round((count / totalPeople) * 100);
  };

  const coverageItems = [
    {
      label: "In UniteUs",
      value: coverage.inUniteUs,
      percentage: calculatePercentage(coverage.inUniteUs),
      description: "Tracked in UniteUs system",
    },
    {
      label: "In HMIS",
      value: coverage.inHMIS,
      percentage: calculatePercentage(coverage.inHMIS),
      description: "Tracked in HMIS",
    },
    {
      label: "Has Mailing Address",
      value: coverage.hasMailingAddress,
      percentage: calculatePercentage(coverage.hasMailingAddress),
      description: "Has a mailing address on file",
    },
    {
      label: "Employed",
      value: coverage.employed,
      percentage: calculatePercentage(coverage.employed),
      description: "Currently employed",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        System Integration & Coverage
      </h2>
      <div className="grid grid-cols-2 tablet:grid-cols-4 gap-6">
        {coverageItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {item.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {item.percentage}%
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
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

